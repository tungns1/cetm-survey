
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { CounterStateService } from './filter';

@Injectable()
export class CounterNavService {
    constructor(
        private router: Router,
        private stateService: CounterStateService
    ) {

    }

    SyncState() {
        this.stateService.triggerChange();
        this.SyncLink();
    }

    SyncLink() {
        this.router.navigate([], {
            queryParams: this.ToQuery()
        });
    }

    private ToQuery() {
        return Object.assign(
            {},
            this.stateService.Current.ToQuery()
        )
    }


}