import { WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/observable/dom/websocketSubject';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const SOCKET_RECONNECT_DELAY = 3000;

const SocketStatus = {
    Open: "open",
    Closed: "closed",
    Init: "init"
}

export interface IBaseMessage {
    uri: string;
    data: any;
    status?: 'success' | 'error';
}

export abstract class AbstractMessageHandler<T> {
    abstract deserialize(e: string): T;
    abstract serialize(data: T): string;
}

export class BaseWebsocket {
    constructor(private messageHandler: AbstractMessageHandler<IBaseMessage>) {

    }

    private config: WebSocketSubjectConfig;
    private socket$: WebSocketSubject<string>;
    private message$ = new Subject<IBaseMessage>();
    private queue: IBaseMessage[] = [];
    Message$ = this.message$.asObservable();

    filter(uri: string) {
        return this.Message$.filter(m => m && m.uri === uri).map(m => m.data);
    }

    private status$ = new BehaviorSubject<string>(SocketStatus.Init);
    Status$ = this.status$.asObservable();

    protected connect(url: string) {
        this.config = {
            url: url,
            resultSelector: e => e.data,
            openObserver: {
                next: (data) => {
                    this.status$.next(SocketStatus.Open);
                    this.pushQueue();
                }
            },
            closeObserver: {
                next: (data) => {
                    this.status$.next(SocketStatus.Closed);
                    this.reconnect();
                }
            }
        }
        this.reconnectable = true;
        this.reconnect();
    }

    private reconnect(delay: number = SOCKET_RECONNECT_DELAY) {
        setTimeout(() => {
            if (this.reconnectable) {
                if (!this.isOpen) {
                    this.socket$ = new WebSocketSubject(this.config);
                    this.socket$.subscribe(raw => {
                        const data = this.messageHandler.deserialize(raw);
                        this.message$.next(data);
                    });
                } else {
                    // try again
                    console.log("socket already open");
                    this.reconnect();
                }
            }

        }, delay);
    }

    protected send(uri: string, data: any) {
        this.queue.push({ uri, data });
        this.pushQueue();
    }

    protected close(reconnectable = false) {
        this.reconnectable = reconnectable;
        if (this.socket$) {
            this.socket$.complete();
        }
    }

    get isOpen() {
        return this.status$.value === SocketStatus.Open;
    }

    private pushQueue() {
        while (this.queue.length && this.isOpen) {
            const m = this.queue.shift();
            const raw = this.messageHandler.serialize(m);
            this.socket$.next(raw);
        }
    }

    private reconnectable = true;
}
