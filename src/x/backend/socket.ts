
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as Loading from './loading';

const INITIAL_TIMEOUT = 5000;
const MAX_TIMEOUT = 5 * 60 * 1000;

const NormalCloseCode = 1000;
const ReconnectableStatusCode = [4000];

interface WsResponse {
  uri: string;
  data: any;
}

interface WsRequest {
  data: any;
  uri: string;
}


if (window['MozWebSocket']) {
  console.log('Using MozWebSocket contructor');
  window['WebSocket'] = window['MozWebSocket'];
}

if (!window['WebSocket']) {
  console.error('This browser do not support WebSocket');
}

// Exponential Backoff Formula by Prof. Douglas Thain
// http://dthain.blogspot.co.uk/2009/02/exponential-backoff-in-distributed.html
function getBackoffDelay(attempt: number) {
  var R = Math.random() + 1;
  var T = INITIAL_TIMEOUT;
  var F = 2;
  var N = attempt;
  var M = MAX_TIMEOUT;
  return Math.floor(Math.min(R * T * Math.pow(F, N), T))
}

function createSocket(url: string) {
  var match = /wss?:\/\//.exec(url);
  if (!match) {
    throw new Error('Invalid url when create socket');
  }
  return new WebSocket(url);
}

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export class Socket {

  protected _doConnect(url: string) {
    if (url) {
      this.url = url;
      this._connect();
    } else {
      throw Error("Invalid url websocket " + url);
    }
  }

  Send<T>(uri: string, data: any): Observable<T> {
    Loading.Show();
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
    this.shouldReconnect = false;
    this.rxConnected.complete();
    this.rxServerEvent.complete();
    this.socket.close();
  }

  OnConnected(cb: () => void) {
    this.rxConnected.filter(v => v).subscribe(cb);
  }

  Subscribe<T>(uri: string, onEvent: (v: T) => void) {
    let s = this.rxServerEvent.filter(v => v.uri == uri)
      .map(v => v.data).subscribe(onEvent);
  }

  private onMessageHandler(msg: MessageEvent) {
    try {
      var body: string = msg.data;
      var index = body.indexOf(" ");
      var uri = body.substring(0, index);
      var isError = uri.indexOf("/error") === 0;
      var data = JSON.parse(body.substring(index + 1, body.length));
      if (isError) {
        uri = data['uri'];
      }
    } catch (e) {
      console.error("parse server data to json " + e);
      return;
    }

    var observer = uri ? this.responseObservers[uri] : null;

    if (observer) {
      Loading.Hide();
      if (isError) {
        console.log("response error", uri, data['err']);
        observer.error(data['err']);
      } else {
        console.log("response", uri, data);
        observer.next(data);
        observer.complete();
      }
      delete this.responseObservers[uri];
    } else {
      this.rxServerEvent.next({
        uri: uri,
        data: data,
      })
      console.log("server event", uri, data);
    }
  }

  private sendQueue: { wsRequest: WsRequest, observer: Observer<WsResponse> }[] = [];
  private responseObservers: { [index: string]: Observer<any> } = {};


  private fireQueue() {
    while (this.sendQueue.length && this.socket.readyState === WebSocket.OPEN) {
      let item = this.sendQueue.shift();
      let request = item.wsRequest;
      let payload = request.data;
      if (Array.isArray(payload) || typeof payload === 'object') {
        payload = JSON.stringify(payload);
      }
      this.socket.send(`${request.uri} ${payload}`);
      if (item.observer) {
        this.responseObservers[request.uri] = item.observer;
      }
    }
  }

  private onOpenHandler() {
    this.rxConnected.next(true);
    this._reconnectAttempts = 0;
    // emit event
    this.fireQueue();
  }

  private onErrorHandler(err) {

  }

  private shouldReconnect = true;

  private onCloseHandler(event) {
    // notify error
    this.rxConnected.next(false);
    if (this.shouldReconnect) {
      if (event.code !== NormalCloseCode || ReconnectableStatusCode.indexOf(event.code) > -1) {
        this.reconnect();
      }
    }
  }

  private reconnect() {
    if (!this.socket.bufferedAmount) {
      this.socket.close();
    }
    var backoffDelay = getBackoffDelay(++this._reconnectAttempts);
    console.log('Reconnecting in ' + backoffDelay / 1000 + ' seconds...');
    setTimeout(_ => this._connect(), backoffDelay);
  }

  private _connect() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = createSocket(this.url);
      this.socket.onmessage = msg => this.onMessageHandler(msg);
      this.socket.onopen = _ => this.onOpenHandler();
      this.socket.onerror = e => this.onErrorHandler(e);
      this.socket.onclose = e => this.onCloseHandler(e);
    }
  }

  private _reconnectAttempts = 0;
  private socket: WebSocket;
  private url: string;
  rxConnected = new BehaviorSubject(false);
  rxServerEvent = new Subject<WsResponse>();
}