import { Socket } from './socket';
import { BehaviorSubject ,  ReplaySubject ,  Observable ,  Observer ,  interval ,  of ,  SubscriptionLike as ISubscription } from 'rxjs';
import { LogService } from '../platform';
import { BaseWebsocket, IBaseMessage, AbstractMessageHandler } from './web_socket';
import { publishReplay, refCount, filter, map, first, switchMap, timeout, catchError, tap } from 'rxjs/operators';
// import { ShowLoading, HideLoading } from './loading';

interface IBaseError {
    err: any;
    uri: string;
}

class PrefixMessageHandler extends AbstractMessageHandler<IBaseMessage> {
    deserialize(payload: string) {
        payload = payload || '';
        const index = payload.indexOf(" ");
        const uri = payload.substr(0, index);
        try {
            const buffer = payload.substring(index + 1);
            if (!buffer || buffer.length < 1) {
                return null;
            }
            const data = JSON.parse(buffer);
            const res: IBaseMessage = { uri, data };
            return res;
        } catch (e) {
            console.log("[socket]", payload, e);
        }
    }

    serialize(message: IBaseMessage) {
        var data = message.data;
        if (typeof data !== 'string') {
            data = JSON.stringify(data)
        }
        return `${message.uri} ${data}`;
    }
}

export class AppSocket extends BaseWebsocket {
    constructor(private uri: string, debug: boolean, private logService: LogService) {
        super(new PrefixMessageHandler());
        this.init();
    }

    private logger = this.logService.Tag("socket");

    private init() {
        this.reload$.subscribe(() => setTimeout(() => {
            window.location.reload();
        }, Math.random() * 3000));
        this.error$.subscribe(e => this.logger.Error(e));
    }

    Connect<P>(params: P) {
        this.params = params || {};
        super.Connect(this.getLink());
        this.KeepAlive();
    }

    private getLink() {
        const params = this.params;
        const q = Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
        const link = `${this.uri}?${q}&reconnect_count=${this.reconnect_count}`;
        return link;
    }

    private params: any;
    private reconnect_count = 0;


    private reload$ = this.filterMessage("/reload");

    Send<T>(uri: string, data: any): Observable<T> {
        uri += `?once=${this.makeOnce()}`;
        super.send(uri, data);
        this.incPending();
        return this.first<T>(uri).pipe(tap(_ => this.decrPending()));
    }

    Terminate() {
        this.DisableKeepAlive();
        super.Terminate();
    }

    RxEvent<T>(uri: string, replay = 1) {
        return this.filter<T>(uri).pipe(publishReplay(replay),refCount());
    }

    KeepAlive(time = this.minEchoInterval) {
        if (this.subscription) {
            return;
        }
        time = +time || 0;
        if (time < this.minEchoInterval) {
            time = this.minEchoInterval;
        }
        this.echoInterval = time;
        this.subscription = interval(this.echoInterval).pipe(switchMap(() => {
            return this.Send("/echo", null)
                .pipe(timeout(this.waitForEcho),catchError(e => {
                    console.log("[app_socket] echo timeout");
                    this.reconnect_count++;
                    this.Reconnect(this.getLink());
                    return of(null);
                }))
        })).subscribe();
    }

    DisableKeepAlive() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    

    public filter<T>(uri: string): Observable<T> {
        return new Observable<T>(observer => {
            this.filterMessage<T>(uri).subscribe(v => observer.next(v));
            this.filterError(uri).pipe(first()).subscribe(e => observer.error(e));
        });
    }

    public first<T>(uri: string): Observable<T> {
        return new Observable<T>(observer => {
            this.filterMessage<T>(uri).pipe(first()).subscribe(v => {
                observer.next(v);
                observer.complete();
            });
            this.filterError(uri).pipe(first()).subscribe(e => {
                observer.error(e);
                observer.complete();
            });
        });
    }

    private makeOnce() {
        return Math.random().toString(36).substring(7);
    }


    private subscription: ISubscription;
    private waitForEcho = 32 * 1000;
    private minEchoInterval = 32 * 1000;
    private echoInterval = this.minEchoInterval;

    protected error$ = this.filterMessage<IBaseError>("/error");

    private filterError(uri: string) {
        return this.error$.pipe(filter(e => e.uri === uri),map(e => e.err));
    }

    private incPending() {
        this.pending++;
        if (this.pending > 0) {
            this.Busy$.next(true);
        }
    }

    private decrPending() {
        if (this.pending >= 1) {
            this.pending--;
        }
        if (this.pending == 0) {
            this.Busy$.next(false);
        }
    }

    private pending = 0;
    Busy$ = new BehaviorSubject<boolean>(false);
}
