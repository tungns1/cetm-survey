import { ISession, Activate, Destroy, RxCurrentSession, IMySettings, RxMySetting } from '../session';
import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend/service';
import { HttpError } from '../../x/backend/';
import { RxBranchCode } from './auth-guard.service';

const authBackend = new HttpApi<any>("/api/auth");

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';

export function RefreshMySettings() {
    return authBackend.Get<IMySettings>("my_settings", { scope: AuthOptions.Scope }).map(v => {
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
    Branch_code: '',
    Auto: false,
    Scope: '',
    Redirect: '/'
}

export function Login(form) {
    const values = Object.assign({ auto: AuthOptions.Auto, scope: AuthOptions.Scope, branch_code: AuthOptions.Branch_code }, form);
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