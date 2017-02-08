import { ISession, Activate, Destroy, RxCurrentSession, IMySettings, RxMySetting } from '../session';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend';
import { HttpError } from '../../../x/backend/';

const authBackend = new HttpApi<any>("/api/auth");

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';

export function RefreshMySettings() {
    return authBackend.Get<IMySettings>("my_settings", { scope: AuthOptions.scope }).map(v => {
        RxMySetting.next(v);
        return true;
    })
}

export function Logout() {
    Destroy();
    setTimeout(_ => {
        window.location.reload();
    }, 250);
}

export const AuthOptions = {
    branch_code: '',
    auto: false,
    scope: '',
    redirect: '/'
}

export function Login(form) {
    const values = Object.assign({}, AuthOptions, form);
    return authBackend.Post("login", values).map(v => {
        let session: ISession = v.session;
        Activate(session);
        return session;
    })
}

export function Refresh() {
    return RefreshMySettings().catch(e => {
        console.log(e);
        try {
            if ((<HttpError>e).IsUnAuthorized()) {
                Logout();
            }
        } catch (v) {
            Logout();
        }

        return of(false);
    });
}

export function IsAuth() {
    return RxCurrentSession.value.id;
}

class AuthService {
    constructor() {}

    get IsAuth() {
        return RxCurrentSession.value.id;
    }
    
}