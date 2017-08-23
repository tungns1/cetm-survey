import { Socket } from './socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../platform';
import { Observer } from 'rxjs/Observer';
import { BaseWebsocket, IBaseMessage, AbstractMessageHandler } from './web_socket';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/publishReplay';
import { ISubscription } from 'rxjs/Subscription';
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
        const q = Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
        const link = `${this.uri}?${q}`;
        super.connect(link);
    }

    Connected$ = this.Status$.filter(_ => this.isOpen);
    Disconnected = this.Status$.filter(_ => !this.isOpen);

    private reload$ = this.filterMessage("/reload");

    disableCheckAlive() {

    }

    Send<T>(uri: string, data: any): Observable<T> {
        // this.showLoading();
        uri += `?once=${this.makeOnce()}`;
        super.send(uri, data);
        return this.first<T>(uri);
        //.do(this.hideLoading, this.hideLoading);
    }

    Terminate() {
        this.DisableKeepAlive();
        super.close(false);
    }

    RxEvent<T>(uri: string, replay = 1) {
        return this.filter<T>(uri).publishReplay(replay).refCount();
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
        this.subscription = interval(this.echoInterval).switchMap(() => {
            return this.Send("/echo", null)
                .timeout(this.waitForEcho).catch(e => {
                    console.log("[app_socket] echo timeout");
                    this.closeAndReconnect();
                    return of(null);
                })
        }).subscribe();
    }

    DisableKeepAlive() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    StatusMessage$ = this.Status$.map((v, i) => {
        if (this.isOpen) {
            return "";
        }
        return i === 0 ? "CONNECTING" : "CONNECTION ERROR";
    }).share();

    public filter<T>(uri: string): Observable<T> {
        return new Observable<T>(observer => {
            this.filterMessage<T>(uri).subscribe(v => observer.next(v));
            this.filterError(uri).first().subscribe(e => observer.error(e));
        });
    }

    public first<T>(uri: string): Observable<T> {
        return new Observable<T>(observer => {
            this.filterMessage<T>(uri).first().subscribe(v => {
                observer.next(v);
                observer.complete();
            });
            this.filterError(uri).first().subscribe(e => {
                observer.error(e);
                observer.complete();
            });
        });
    }

    private makeOnce() {
        return Math.random().toString(36).substring(7);
    }


    private subscription: ISubscription;
    private waitForEcho = 8 * 1000;
    private minEchoInterval = this.waitForEcho + 2000;
    private echoInterval = this.minEchoInterval;

    protected error$ = this.filterMessage<IBaseError>("/error");

    private filterError(uri: string) {
        return this.error$.filter(e => e.uri === uri).map(e => e.err);
    }

    // private showLoading = ShowLoading;
    // private hideLoading = HideLoading;

    // protected NoLoading() {
    //     this.showLoading = () => { };
    //     this.hideLoading = () => { };
    // }

}
