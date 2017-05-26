import { Socket } from './socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../platform';
import { Observer } from 'rxjs/Observer';
import { BaseWebsocket, IBaseMessage, AbstractMessageHandler } from './web_socket';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/timeout';
import { ISubscription } from 'rxjs/Subscription';

class PrefixMessageHandler extends AbstractMessageHandler<IBaseMessage> {
    deserialize(payload: string) {
        payload = payload || '';
        const ERROR_PREFIX = "/error";
        const isError = payload.startsWith("/error");
        if (isError) {
            payload = payload.substring(ERROR_PREFIX.length);
        }
        const index = payload.indexOf(" ");
        const uri = payload.substr(0, index);
        try {
            const buffer = payload.substring(index + 1);
            if (!buffer || buffer.length < 1) {
                return null;
            }
            const data = JSON.parse(buffer);
            const status = isError ? 'error' : 'success';
            const res: IBaseMessage = { uri, data, status };
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
    constructor(private uri: string, debug: boolean, logService: LogService) {
        super(new PrefixMessageHandler());
        this.init();
    }

    private init() {
        this.reload$.subscribe(() => setTimeout(() => {
            window.location.reload();
        }, Math.random() * 1000));
    }

    Connect<P>(params: P) {
        const q = Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
        const link = `${this.uri}?${q}`;
        super.connect(link);
    }

    Connected$ = this.Status$.filter(_ => this.isOpen);
    Disconnected = this.Status$.filter(_ => !this.isOpen);

    private reload$ = this.filter("/reload");

    disableCheckAlive() {

    }

    Send<T>(uri: string, data: any): Observable<T> {
        uri += `?once=${this.makeOnce()}`;
        super.send(uri, data);
        return new Observable<T>((observer) => {
            this.filter(uri).first().subscribe((m: IBaseMessage) => {
                if (m.status === "success") {
                    observer.next(m.data);
                } else if (m.status === "error") {
                    observer.error(m.data);
                }
            });
        });
    }

    Terminate() {
        this.disableCheckAlive();
        super.close(false);
    }

    RxEvent<T>(uri: string, replay = 1) {
        const res = new ReplaySubject<T>(replay);
        this.Subscribe<T>(uri, data => res.next(data));
        return res;
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
                    this.close(true);
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

    private makeOnce() {
        return Math.random().toString(36).substring(7);
    }

    private subscription: ISubscription;
    private waitForEcho = 8 * 1000;
    private minEchoInterval = this.waitForEcho + 2000;
    private echoInterval = this.minEchoInterval;

}
