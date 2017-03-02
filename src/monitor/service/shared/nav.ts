
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { MonitorFilterService } from './filter';

@Injectable()
export class MonitorNavService {
    constructor(
        private router: Router,
        private filterService: MonitorFilterService
    ) {

    }

    isShowDetail = false;

    SyncFilter() {
        this.filterService.triggerChange();
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
            this.filterService.Current.ToQuery()
        )
    }


}