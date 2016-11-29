import { ISession, Activate, Destroy, GetToken, IMySettings, RxMySetting } from '../session';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend/service';
import { IsErrUnauthorized } from '../../x/backend/';

const authBackend = new HttpApi<any>("/api/auth");
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export function Refresh() {
    return authBackend.Get<IMySettings>("my_settings", { token: GetToken() }).map(v => {
        RxMySetting.next(v);
        return true;
    }).catch(e => {
        if (IsErrUnauthorized(e)) {
            this.Logout();
        }
        return Observable.of(false);
    });
}

export function Logout() {
    Destroy();
}

export function Login(form) {
    return authBackend.Post("login", form).map(v => {
        Activate(v.session);
        return v.session;
    })
}

export function IsLoggedIn() {
    return GetToken();
}