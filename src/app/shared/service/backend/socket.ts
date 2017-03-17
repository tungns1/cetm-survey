
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from '../../../x/backend';
import { WsHost } from '../../config/setting';
import { Toast } from '../../../x/ui';

export const RxError = new BehaviorSubject<{ type?: string, message?: string }>({});

RxError.subscribe(e => console.info(e));
import 'rxjs/add/operator/skip';

export class AppSocket extends Socket {
    constructor(private uri: string, private fields?: string[]) {
        super();
        this.fields = this.fields || [];
        this.init();
    }

    private init() {
        this.rxConnected.skip(1).subscribe(c => {
            if (c) {
                RxError.next({ type: "connect" });
            } else {
                var toast = new Toast();
                toast.Title('Lỗi').Error('Lỗi kết nối máy chủ').Show();
                // Loading.Hide();
                RxError.next({ type: "connect", message: "Cannot connect to the server" });
            }
        });

        this.Subscribe("/error", e => RxError.next({ type: "system", message: e['err'] }));
        this.Subscribe("/reload", () => window.location.reload());
    }

    private build(link: string) {
        return `${WsHost()}${link}`;
    }

    Connect<T>(params: T) {
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

    Connected$ = this.rxConnected.filter(c => c);
}
