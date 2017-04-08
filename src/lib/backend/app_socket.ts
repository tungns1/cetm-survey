import { Socket } from './socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { LogService } from '../platform';

import { BaseWebsocket, IBaseMessage, AbstractMessageHandler } from './web_socket';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/timeout';

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
        const data = JSON.parse(payload.substring(index + 1));
        const status = isError ? 'error' : 'success';
        const res: IBaseMessage = { uri, data, status };
        return res;
    }

    serialize(message: IBaseMessage) {
        return `${message.uri} ${JSON.stringify(message.data)}`;
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
        return this.filter(uri).first();
    }

    Subscribe<T>(uri: string, onEvent: (v: T) => void) {
        return this.filter(uri).subscribe(onEvent);
    }

    Terminate() {
        super.close();
    }

    RxEvent<T>(uri: string, replay = 1) {
        const res = new ReplaySubject<T>(replay);
        this.filter(uri).subscribe(res);
        return res;
    }

    KeepAlive(time = 10000) {
        return interval(time).switchMap(() => {
            return this.Send("/echo", null).timeout(time - 1000)
        }).subscribe(null, e => {
            console.log(e);
            this.close(true);
        });
    }

    private makeOnce() {
        return Math.random().toString(36).substring(7);
    }

}
