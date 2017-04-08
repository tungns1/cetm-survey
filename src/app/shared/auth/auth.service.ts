import { Observable } from 'rxjs/Observable';
import { HttpServiceGenerator } from '../service';

import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { ISession, RxCurrentToken, SessionService } from './session.service';

import {
    IUser, IBranch, IBranchConfig, IService,
    CacheService, CacheBranch
} from '../model/';

export interface IMySettings {
    me: IUser;
    branches: IBranch[];
    services: IService[];
    config: IBranchConfig;
}

@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private sessionService: SessionService,
        private httpSG: HttpServiceGenerator
    ) {
        // console.log('created auth');
    }

    IsAuth() {
        return this.sessionService.GetToken();
    }

    Login(form) {
        const values = Object.assign(this.options, form);
        values['scope'] = this.scope;
        return this.authBackend.Post<any>("login", {}, values).map(v => {
            let session: ISession = v.session;
            this.sessionService.Activate(session);
            return session;
        })
    }

    Logout() {
        this.sessionService.Destroy();
        location.reload();
    }

    RefreshMySettings() {
        return this.authBackend.Get<IMySettings>(
            "my_settings",
            { scope: this.scope, token: this.sessionService.GetToken(), }
        ).map(v => {
            this.updateMySetting(v);
            return true;
        });
    }

    Refresh() {
        return this.RefreshMySettings().catch((e: string) => {
            if (e.toLowerCase().indexOf("unauthorized") !== -1) {
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
        CacheService.Refresh(v.services);
        if (v.me.branch_id) {
            CacheBranch.Refresh(v.branches);
        }
        this.rxMySetting.next(v);
    }

    get RxMySetting() {
        return this.rxMySetting;
    }

    options = {};
    scope = 'admin';

    private authBackend = this.httpSG.make<any>("/api/auth");
    private rxMySetting = new ReplaySubject<IMySettings>(1);
    autoLogin = false;
    redirect = '/';

    SetRedirect(route: ActivatedRouteSnapshot, url?: string) {
        this.redirect = url || route.queryParamMap.get("redirect") || '';
        if (this.redirect.startsWith("/counter")) {
            this.scope = "staff";
            this.autoLogin = true;
        } else {
            this.scope = "admin";
            this.autoLogin = false;
        }
        this.options["branch_code"] = route.queryParamMap.get("branch_code");
    }
}