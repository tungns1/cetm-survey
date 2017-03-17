
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Router } from '@angular/router';
import { AdminFilterService } from './filter';

@Injectable()
export class AdminNavService {
    constructor(
        private router: Router,
        private filterService: AdminFilterService
    ) {

    }

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