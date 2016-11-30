
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from '../../x/backend/socket';
import { WsHost } from '../../config/setting';

export const RxError = new BehaviorSubject<{ type?: string, message?: string }>({});

RxError.subscribe(e => console.info(e));

export class AppSocket<T> extends Socket {
    constructor(private uri: string, private fields: string[]) {
        super();
        this.init();
    }

    private init() {
        this.rxConnected.subscribe(c => {
            if (c) {
                RxError.next({ type: "connect" });
            } else {
                RxError.next({ type: "connect", message: "Cannot connect to the server" });
            }
        })

        this.Subscribe("/error", e => RxError.next({ type: "system", message: e['err'] }));
    }

    private build(link: string) {
        return `${WsHost()}${link}`;
    }

    Connect(params: T) {
        const isValid = this.fields.every(field => {
            if (!params[field]) {
                RxError.next({ type: "system", message: `missing ${field}` });
                return false;
            }
            return true;
        })
        if (!isValid) {
            return;
        }
        const q = this.fields.map(field => `${field}=${params[field]}`).join("&");
        const link = `${this.uri}?${q}`;
        this._doConnect(this.build(link));
    }
}
