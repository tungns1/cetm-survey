import { Observable } from 'rxjs/Observable';
import { HttpApi } from '../backend';
import { HttpError } from '../../../x/backend/';

import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router, ActivatedRoute } from '@angular/router';

import { Injectable } from '@angular/core';
import { ISession, RxCurrentToken, SessionService } from './session.service';
import { Org, Center, Meta } from '../../model/';

import { AppState } from '../app.service';
import { AuthScopes } from './auth.config';

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
        private route: ActivatedRoute,
        private sessionService: SessionService,
        private appState: AppState
    ) {
        // console.log('created auth');
    }

    private get scope() {
        return AuthScopes[this.appState.AppName];
    }

    IsAuth() {
        return this.sessionService.GetToken();
    }

    Login(form) {
        const values = Object.assign({ scope: this.scope }, this.options, form);
        return this.authBackend.Post("login", values).map(v => {
            let session: ISession = v.session;
            this.sessionService.Activate(session);
            return session;
        })
    }

    Logout() {
        this.sessionService.Destroy();
        this.router.navigate(["/login"], {
            queryParams: this.route.snapshot.queryParams
        });
    }

    RefreshMySettings() {
        return this.authBackend.Get<IMySettings>(
            "my_settings",
            { scope: this.scope, token: this.sessionService.GetToken() }
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

    OnLoginDone() {
        let redirect = this.redirect;
        if (!redirect || redirect.length < 1) {
            redirect = '/';
        }
        this.router.navigateByUrl(redirect);
    }

    private updateMySetting(v: IMySettings) {
        Center.CacheService.Refresh(v.services);
        if (v.me.branch_id) {
            Org.CacheBranch.Refresh(v.branches);
        }
        this.rxMySetting.next(v);
    }

    get RxMySetting() {
        return this.rxMySetting;
    }

    options = {};

    private authBackend = new HttpApi<any>("/api/auth");
    private rxMySetting = new ReplaySubject<IMySettings>(1);
    autoLogin = false;
    redirect = '/';
}