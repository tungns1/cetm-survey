import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend';
import { HttpError } from '../../../x/backend/';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router } from '@angular/router';

export const AuthOptions = {
    branch_code: '',
    auto: false,
    scope: '',
    redirect: '/'
}

import { Injectable } from '@angular/core';
import { ISession, RxCurrentToken, SessionService } from './session.service';
import { Org, Center, Meta } from '../../model/';

export interface IMySettings {
    me: Org.IUser;
    branches: Org.IBranch[];
    services: Center.IService[];
    config: Meta.IBranchConfig;
}

@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private sessionService: SessionService
    ) {
        // console.log('created auth');
    }

    IsAuth() {
        return this.sessionService.GetToken();
    }

    Login(form) {
        const values = Object.assign({}, AuthOptions, form);
        return this.authBackend.Post("login", values).map(v => {
            let session: ISession = v.session;
            this.sessionService.Activate(session);
            return session;
        })
    }

    Logout() {
        this.sessionService.Destroy();
        this.router.navigateByUrl("/login");
        // setTimeout(_ => {
        //     window.location.reload();
        // }, 250);
    }

    RefreshMySettings() {
        return this.authBackend.Get<IMySettings>(
            "my_settings",
            { scope: AuthOptions.scope, token: this.sessionService.GetToken() }
        ).map(v => {
            this.updateMySetting(v);
            return true;
        });
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

    private updateMySetting(v: IMySettings) {
        Center.CacheService.Refresh(v.services);
        if (v.me.branch_id) {
            Org.CacheBranch.Refresh(v.branches, v.me.branch_id);
        }
        this.rxMySetting.next(v);
    }

    get RxMySetting() {
        return this.rxMySetting;
    }

    private authBackend = new HttpApi<any>("/api/auth");
    private rxMySetting = new ReplaySubject<IMySettings>(1);
}