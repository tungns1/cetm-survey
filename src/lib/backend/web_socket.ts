import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publishReplay';

const SOCKET_RECONNECT_DELAY = 3000;

export interface IBaseMessage {
    uri: string;
    data?: any;
}

export abstract class AbstractMessageHandler<T> {
    abstract deserialize(e: string): T;
    abstract serialize(data: T): string;
}

interface IWebsocketConfig {
    url: string;
}

export class BaseWebsocket {
    constructor(private messageHandler: AbstractMessageHandler<IBaseMessage>) {
        this.config = {
            url: ''
        };
    }

    protected filterMessage<T>(uri: string): Observable<T> {
        return this.Message$.filter(m => m && m.uri === uri).map(m => m.data);
    }

    get isOpen() {
        return this.instance && this.instance.readyState == WebSocket.OPEN;
    }

    private status$ = new BehaviorSubject<number>(-1);
    
    Connected$ = this.status$.filter(_ => this.isOpen);
    Disconnected = this.status$.filter(_ => !this.isOpen);
    StatusMessage$ = this.status$.map((v, i) => {
        return this.GetStatus(v);
    }).share().publishReplay().refCount();

    protected GetStatus(status: number) {
        switch (status) {
            case WebSocket.OPEN:
                return "OPEN";
            case WebSocket.CONNECTING:
                return "CONNECTING";
            case WebSocket.CLOSED:
                return "CLOSED";
            case WebSocket.CLOSING:
                return "CLOSING";
            case -1:
                return "INITIALIZING";
        }
        return "UNKNOWN";
    }

    protected Connect(url: string) {
        this.Reconnect(url);
    }

    protected send(uri: string, data: any) {
        this.queue.push({ uri, data });
        this.fireQueue();
    }

    protected Terminate() {
        this.reconnectable = false;
        if (this.instance) {
            this.instance.close();
        }
    }

    protected Reconnect(url?: string) {
        if (url) {
            this.config.url = url;
        }
        this.reconnectable = true;
        if (this.instance) {
            this.instance.close();
        }
        this.reconnect();
    }

    private doConnect() {
        try {
            this.instance = new WebSocket(this.config.url);
            this.instance.onopen = _ => this.onopen();
            this.instance.onmessage = e => this.onmessage(e);
            this.instance.onclose = _ => this.onclose();
            this.instance.onerror = _ => this.onclose();
            this.status$.next(WebSocket.CONNECTING);
        } catch (e) {
            console.error("create websocket failed", e);
        }
    }

    private reconnect(delay: number = SOCKET_RECONNECT_DELAY) {
        if (this.reconnecting) return;
        this.reconnecting = true;
        setTimeout(() => {
            this.doConnect();
            this.reconnecting = false;
        }, delay);
    }

    private onmessage(e: MessageEvent) {
        try {
            const data = this.messageHandler.deserialize(e.data);
            this.message$.next(data);
        } catch (e) {
            console.log("deserialize message error", e);
        }
    }

    private fireQueue() {
        while (this.queue.length && this.isOpen) {
            const m = this.queue.shift();
            const raw = this.messageHandler.serialize(m);
            this.instance.send(raw);
        }
    }

    private onopen() {
        this.status$.next(WebSocket.OPEN);
        this.fireQueue();
    }

    private onclose() {
        this.status$.next(WebSocket.CLOSED);
        if (this.reconnectable) {
            this.reconnect();
        }
    }

    private number = 0;
    private config: IWebsocketConfig;
    private instance: WebSocket;
    private message$ = new Subject<IBaseMessage>();
    private queue: IBaseMessage[] = [];
    Message$ = this.message$.asObservable();
    private reconnectable = true;
    private reconnecting = false;
}
