
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/filter';

import * as Loading from './loading';
import { LogService } from '../platform';
import { ConstPoll } from './poller';

export function WsHost(secure: boolean, host: string) {
  return `${secure ? "wss" : "ws"}://${host}`;
}

const NormalCloseCode = 1000;
const ReconnectableStatusCode = [4000];
const RECONNECT_INTERVAL = 1000;
const MESSAGE_TIMEOUT = 30000;
const ALIVE_CHECK_INTERVAL = 1000;
const MIN_ALIVE_OUT = 3000;
const MAX_ALIVE_OUT = 31000;
const ALIVE_PING_URI = "/__alive";

interface WsResponse {
  uri: string;
  data: any;
}

interface WsRequest {
  data: any;
  uri: string;
}


if (window['MozWebSocket']) {
  console.info('Using MozWebSocket contructor');
  window['WebSocket'] = window['MozWebSocket'];
}

if (!window['WebSocket']) {
  console.error('This browser do not support WebSocket');
}

function createSocket(url: string) {
  var match = /wss?:\/\//.exec(url);
  if (!match) {
    throw new Error(`Missing websocket protocol in ${url} when create socket`);
  }
  return new WebSocket(url);
}

export class Socket {
  constructor(
    private logService: LogService
  ) {
    this.alivePoll.Interval(ALIVE_CHECK_INTERVAL).Work(() => this.checkAlive());
  }

  protected _doConnect(url: string) {
    this.url = url;
    this.forceClose = false;
    this._connect();
  }

  Send<T>(uri: string, data: any): Observable<T> {
    var request: WsRequest = { uri: uri, data: data }
    var response = new Observable<any>((responseObserver: Observer<any>) => {
      request.uri = request.uri + '?once=' + Math.random().toString(36).substring(7);
      this.sendQueue.push({
        wsRequest: request,
        observer: responseObserver
      });
      this.fireQueue();
    })
    return response;
  }

  Terminate() {
    // this.rxConnected.complete();
    // this.rxServerEvent.complete();
    this.alivePoll.Disable();
    this.forceClose = true;
    this.socket.close();
  }

  OnConnected(cb: () => void) {
    return this.rxConnected.filter(v => v).subscribe(cb);
  }

  Subscribe<T>(uri: string, onEvent: (v: T) => void) {
    let s = this.rxServerEvent.filter(v => v.uri == uri)
      .map(v => v.data).subscribe(onEvent);
    return s;
  }

  RxEvent<T>(uri: string, replay = 1) {
    const res = new ReplaySubject<T>(replay);
    this.rxServerEvent.filter(v => v.uri === uri)
      .map(v => v.data).subscribe(res);
    return res;
  }

  private lastMessageAt = 0;
  private forceClose = false;

  private onMessageHandler(msg: MessageEvent) {
    if (this.lastMessageAt === 0) {
      this.alivePoll.Start();
    }

    this.lastMessageAt = Date.now();
    try {
      var body: string = msg.data;

      if (body.startsWith(ALIVE_PING_URI)) {
        this.secondLastAlive = this.lastAliveAt;
        this.lastAliveAt = this.lastMessageAt;
        // live
        if (this.lastAliveAt > 0) {
          if (this.secondLastAlive > 0) {
            const aliveOut = (this.lastAliveAt - this.secondLastAlive) + 3000;
            const c = Math.abs(this.aliveOut - aliveOut);
            this.logService.Debug("change", c);
            if (c > 1000 && aliveOut > MIN_ALIVE_OUT && aliveOut < MAX_ALIVE_OUT) {
              this.aliveOut = aliveOut;
              this.logService.Debug("alive", this.aliveOut);
            }
          }
        }
        return;
      }
      var index = body.indexOf(" ");
      var uri = body.substring(0, index);
      var isError = uri.indexOf("/error") === 0;
      var data = JSON.parse(body.substring(index + 1, body.length));
      if (isError) {
        uri = data['uri'];
      }
    } catch (e) {
      this.logService.Error("parse server data to json " + e);
      return;
    }

    var observer = uri ? this.responseObservers[uri] : null;

    if (observer) {
      if (isError) {
        this.logService.Info("response error", uri, data['err']);
        observer.error(data['err']);
      } else {
        this.logService.Debug("response", uri, data);
        observer.next(data);
        observer.complete();
      }
      delete this.responseObservers[uri];
    } else {
      this.rxServerEvent.next({
        uri: uri,
        data: data,
      })
      this.logService.Debug("server event", uri, data);
    }
  }

  private sendQueue: { wsRequest: WsRequest, observer: Observer<WsResponse> }[] = [];
  private responseObservers: { [index: string]: Observer<any> } = {};


  private fireQueue() {
    while (this.sendQueue.length && this.socket.readyState === WebSocket.OPEN) {
      let item = this.sendQueue.shift();
      let request = item.wsRequest;
      let data = [
        request.uri,
        typeof request.data === 'string' ? request.data : JSON.stringify(request.data)
      ].join(' ');

      this.socket.send(data);
      if (item.observer) {
        this.responseObservers[request.uri] = item.observer;
        setTimeout(_ => {
          delete this.responseObservers[request.uri];
        }, MESSAGE_TIMEOUT);
      }
    }
  }

  private onOpenHandler() {
    this.rxConnected.next(true);
    // emit event
    this.fireQueue();
  }

  private close() {
    if (this.socket) {
      const socket = this.socket;
      socket.onmessage = null;
      socket.onopen = null;
      socket.onclose = null;
      if (socket.readyState !== WebSocket.CLOSED) {
        socket.close();
      }
      this.alivePoll.Stop();
    }
    this.rxConnected.next(false);
  }

  private tryReconnect() {
    this.lastMessageAt = 0;
    this.lastAliveAt = 0;
    this.logService.Info('Reconnect in ', RECONNECT_INTERVAL / 1000, 'seconds');
    setTimeout(() => this._connect(), RECONNECT_INTERVAL);
  }

  private checkAlive() {
    const inactive = Date.now() - this.lastMessageAt;
    this.logService.Debug('inactive', inactive);
    if (inactive > this.aliveOut) {
      // close the socket 
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.close();
        this.tryReconnect();
      }
    }
  }

  private _connect() {
    if (this.socket && this.socket.readyState === WebSocket.CONNECTING) {
      return;
    }
    this.socket = createSocket(this.url);
    this.socket.onmessage = msg => this.onMessageHandler(msg);
    this.socket.onopen = _ => this.onOpenHandler();
    this.socket.onclose = _ => this.tryReconnect();
  }

  private socket: WebSocket;
  private lastAliveAt = 0;
  private secondLastAlive = 0;
  private url: string;
  private alivePoll = new ConstPoll();
  private aliveOut = MAX_ALIVE_OUT;
  rxConnected = new BehaviorSubject(false);
  rxServerEvent = new ReplaySubject<WsResponse>(4);

  disableCheckAlive() {
    this.alivePoll.Disable();
  }
}