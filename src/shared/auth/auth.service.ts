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

export function Logout() {
    Destroy();
    setTimeout(_ => {
        window.location.reload();
    }, 250);
}

export const AuthOptions = {
    Auto: false,
    Scope: '',
    Redirect: '/'
}

export function Login(form) {
    const values = Object.assign({ auto: AuthOptions.Auto, scope: AuthOptions.Scope }, form);
    return authBackend.Post("login", values).map(v => {
        let session: ISession = v.session;
        Activate(session);
        return session;
    })
}

export function Refresh() {
    return RefreshMySettings().catch(e => {
        if (IsErrUnauthorized(e)) {
            Logout();
        }
        return of(false);
    });
}

export function IsAuth() {
    return GetToken();
}