import { ISession, Activate, Destroy, GetToken, IMySettings, RxMySetting } from '../session';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend/service';
import { IsErrUnauthorized } from '../../x/backend/';

const authBackend = new HttpApi<any>("/api/auth");

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';

export function RefreshMySettings() {
    return authBackend.Get<IMySettings>("my_settings").map(v => {
        RxMySetting.next(v);
        return true;
    })
}

@Injectable()
export class AuthService {
    Login(form) {
        const values = Object.assign({ auto: this.Auto, scope: this.Scope }, form);
        return authBackend.Post("login", values).map(v => {
            Activate(v.session);
            return v.session;
        })
    }

    Logout() {
        Destroy();
    }

    Refresh() {
        return RefreshMySettings().catch(e => {
            if (IsErrUnauthorized(e)) {
                Destroy();
            }
            return of(false);
        });
    }

    IsLoggedIn() {
        return GetToken();
    }

    Redirect = [];
    Scope = '';
    Auto = false;
}
