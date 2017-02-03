
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as Loading from './loading';
import { Log, Poller } from '../util';

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
  Log.Info('Using MozWebSocket contructor');
  window['WebSocket'] = window['MozWebSocket'];
}

if (!window['WebSocket']) {
  Log.Error('This browser do not support WebSocket');
}

function createSocket(url: string) {
  var match = /wss?:\/\//.exec(url);
  if (!match) {
    throw new Error('Invalid url when create socket');
  }
  return new WebSocket(url);
}

export class Socket {
  constructor() {
    this.alivePoll.Interval(ALIVE_CHECK_INTERVAL).Work(() => this.checkAlive());
  }

  protected _doConnect(url: string) {
    if (url) {
      this.url = url;
      this._connect();
    } else {
      throw Error("Invalid url websocket " + url);
    }
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
    this.rxConnected.complete();
    this.rxServerEvent.complete();
    this.onClose(true);
  }

  OnConnected(cb: () => void) {
    this.rxConnected.filter(v => v).subscribe(cb);
  }

  Subscribe<T>(uri: string, onEvent: (v: T) => void) {
    let s = this.rxServerEvent.filter(v => v.uri == uri)
      .map(v => v.data).subscribe(onEvent);
  }

  private lastMessageAt = 0;

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
            Log.Debug("change", c);
            if (c > 1000 && aliveOut > MIN_ALIVE_OUT && aliveOut < MAX_ALIVE_OUT) {
              this.aliveOut = aliveOut;
              Log.Debug("alive", this.aliveOut);
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
      Log.Error("parse server data to json " + e);
      return;
    }

    var observer = uri ? this.responseObservers[uri] : null;

    if (observer) {
      if (isError) {
        Log.Info("response error", uri, data['err']);
        observer.error(data['err']);
      } else {
        Log.Debug("response", uri, data);
        observer.next(data);
        observer.complete();
      }
      delete this.responseObservers[uri];
    } else {
      this.rxServerEvent.next({
        uri: uri,
        data: data,
      })
      Log.Debug("server event", uri, data);
    }
  }

  private sendQueue: { wsRequest: WsRequest, observer: Observer<WsResponse> }[] = [];
  private responseObservers: { [index: string]: Observer<any> } = {};


  private fireQueue() {
    while (this.sendQueue.length && this.socket.readyState === WebSocket.OPEN) {
      let item = this.sendQueue.shift();
      let request = item.wsRequest;
      let data = [request.uri, JSON.stringify(request.data)].join(' ');
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

  private onClose(force?: boolean) {
    if (this.socket) {
      const socket = this.socket;
      socket.onmessage = null;
      socket.onopen = null;
      socket.onclose = null;
      socket.close();
      this.alivePoll.Stop();
    }
    this.rxConnected.next(false);
    if (!force) {
      this.lastMessageAt = 0;
      this.lastAliveAt = 0;
      Log.Info('Reconnect in ', RECONNECT_INTERVAL / 1000, 'seconds');
      setTimeout(() => this._connect(), RECONNECT_INTERVAL);
    }
  }


  private checkAlive() {
    const inactive = Date.now() - this.lastMessageAt;
    Log.Debug('inactive', inactive);
    if (inactive > this.aliveOut) {
      // close the socket 
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.onClose();
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
    this.socket.onclose = _ => this.onClose();
  }

  private socket: WebSocket;
  private lastAliveAt = 0;
  private secondLastAlive = 0;
  private url: string;
  private alivePoll = new Poller.ConstPoll();
  private aliveOut = MAX_ALIVE_OUT;
  rxConnected = new BehaviorSubject(false);
  rxServerEvent = new Subject<WsResponse>();
}