import { Socket } from './socket';
import { ReplaySubject } from 'rxjs/ReplaySubject';

class SocketError {
    constructor(protected type: string, protected message?: string) { }
}

const ConnectionError = new SocketError("Connection");

class BadRequestError extends SocketError {
    constructor(message: string) {
        super("Bad Request", message);
    }
}

import { LogService } from '../platform';

import 'rxjs/add/operator/skip';

export class AppSocket extends Socket {
    constructor(private uri: string, debug: boolean, logService: LogService) {
        super(logService.Tag("Socket", debug));
        this.init();
    }

    private init() {
        this.Disconnected.skip(1).subscribe(() => {
            this.Error$.next(ConnectionError);
        });

        this.Subscribe("/error", e => this.Error$.next(new BadRequestError(e['err'])));
        this.Subscribe("/reload", () => setTimeout(() => {
            window.location.reload();
        }, Math.random() * 1000));
    }

    Connect<T>(params: T) {
        const q = Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
        const link = `${this.uri}?${q}`;
        this._doConnect(link);
    }

    Connected$ = this.rxConnected.filter(c => c);
    Disconnected = this.rxConnected.filter(c => !c);
    Error$ = new ReplaySubject<SocketError>(1);
}
