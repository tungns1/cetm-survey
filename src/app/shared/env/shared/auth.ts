import {
    AppStorage,
    AbstractSerializable, AbstractStorageStrategy, SmallStorage
} from '../../shared';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IUser, IBranch, IService, IBranchConfig, CacheBranch, CacheService } from '../../model';

interface IAuthEnv {
    branch: string;
    store: string;
    module: string;
    sub_module: string;
    me: IUser;
    branches: IBranch[];
    services: IService[];
    config: IBranchConfig;
}

interface ILoginPageData {
    scope: string;
    branch_code?: string;
    auto_login?: boolean;
    redirect: string;
}

const LOGIN_URL = "/auth/login";

@Injectable()
export class AuthEnvStorage {
    constructor(
        private router: Router
    ) { }

    Data$ = new ReplaySubject<IAuthEnv>(1);
    User$ = this.Data$.map(d => d.me).filter(u => !!u).share();
    private data: IAuthEnv = <any>{};

    emitChange() {
        this.Data$.next(this.data);
    }

    set Module(m: string) {
        this.data.module = m;
        this.emitChange();
    }

    set SubModule(m: string) {
        this.data.sub_module = m;
        this.emitChange();
    }

    get HasToken() {
        return !!AppStorage.Token;
    }

    ShowLogin(data: ILoginPageData) {
        this.router.navigate([LOGIN_URL], {
            queryParams: data,
            queryParamsHandling: "merge"
        });
    }

    Update(me: IUser, branches: IBranch[], services: IService[], config: IBranchConfig) {
        const data = this.data;
        Object.assign(data, { me, branches, services, config });
        CacheBranch.Refresh(branches);
        CacheService.Refresh(services);
        const store = CacheBranch.GetByID(me.branch_id);
        data.store = store ? store.name : "";
        const branch = CacheBranch.GetByID(store ? store.parent : "");
        data.branch = branch ? branch.name : "";
        this.emitChange();
    }
}