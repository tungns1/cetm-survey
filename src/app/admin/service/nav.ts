
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Router } from '@angular/router';

import { ExclusiveSubject } from '../../../lib/rx';

@Injectable()
export class AdminNavService {
    constructor(
        private router: Router,
    ) {

    }

    SyncFilter() {
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
        )
    }

    Refresh$ = new ExclusiveSubject();
}