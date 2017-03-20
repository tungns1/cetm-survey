import { NgModule, FactoryProvider, Inject, Injectable } from '@angular/core';
import { AbstractStorageStrategy, SmallStorage } from './storage';
import { Router, RouterState } from '@angular/router';

@Injectable()
export class RouterQueryStorageStrategy extends AbstractStorageStrategy {
    constructor(
        private router: Router,
    ) {
        super();
    }

    get query() {
        return this.router.routerState.snapshot.root.queryParams;
    }

    readRaw(key: string) {
        return this.query[key];
    }

    saveRaw(key: string, value: string) {
        const change = {};
        change[key] = value;
        this.router.navigate([], {
            queryParams: change,
            queryParamsHandling: 'merge'
        })
    }

    static Provider() {
        return <FactoryProvider>{
            provide: AbstractStorageStrategy,
            deps: [Router],
            useFactory: (router) => {
                return new RouterQueryStorageStrategy(router)
            }
        }
    }
}

