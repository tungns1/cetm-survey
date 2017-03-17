export interface AuthEnv {
    Branch: string;
    Store: string;
    Module: string;
    Submodule: string;
    Username: string;
    Fullname: string;
    UserID: string;
    Role: string;
}

export interface PlatformEnv {
    AssetHost: string;
    HttpHost: string;
    SocketHost: string;
}

export interface DebugEnv {
    Layout?: boolean;
    Socket?: boolean;
}

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { SmallStorage, RouterQueryStorageStrategy } from '../shared';
import { Injectable } from '@angular/core';

const DefaultPlatform: PlatformEnv = {
    AssetHost: `${location.protocol}://${location.host}`,
    HttpHost: `${location.protocol}://${location.host}`,
    SocketHost: `ws://${location.host}`
}

@Injectable()
export class RuntimeEnvironment {
    constructor(
        private storageStrategy: RouterQueryStorageStrategy
    ) {

        this.Platform = Object.assign(DefaultPlatform, this.Platform);
    }


    get Platform() {
        return this.PlatformStorage.Data$.value;
    }

    set Platform(data: PlatformEnv) {
        this.PlatformStorage.Data$.next(data);
    }

    get Debug() {
        return this.DebugStorage.Data$.value;
    }

    set Debug(data: DebugEnv) {
        this.DebugStorage.Data$.next(data);
    }

    private DebugStorage = new SmallStorage<DebugEnv>("debug", this.storageStrategy);
    private PlatformStorage = new SmallStorage<PlatformEnv>("platform", this.storageStrategy);
    Auth$ = new ReplaySubject<AuthEnv>(1);
}