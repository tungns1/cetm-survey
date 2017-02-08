import { ISession, Activate, Destroy, RxCurrentSession, IMySettings, RxMySetting } from '../session';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend';
import { HttpError } from '../../../x/backend/';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const AuthOptions = {
    branch_code: '',
    auto: false,
    scope: '',
    redirect: '/'
}

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor() { }

    IsAuth() {
        return RxCurrentSession.value.id;
    }

    Login(form) {
        const values = Object.assign({}, AuthOptions, form);
        return this.authBackend.Post("login", values).map(v => {
            let session: ISession = v.session;
            Activate(session);
            return session;
        })
    }

    Logout() {
        Destroy();
        setTimeout(_ => {
            window.location.reload();
        }, 250);
    }

    RefreshMySettings() {
        return this.authBackend.Get<IMySettings>("my_settings", { scope: AuthOptions.scope }).map(v => {
            RxMySetting.next(v);
            return true;
        })
    }

    Refresh() {
        return this.RefreshMySettings().catch(e => {
            console.log(e);
            try {
                if ((<HttpError>e).IsUnAuthorized()) {
                    this.Logout();
                }
            } catch (v) {
                this.Logout();
            }

            return of(false);
        });
    }

    private authBackend = new HttpApi<any>("/api/auth");
}