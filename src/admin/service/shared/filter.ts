
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class AdminFilter {
    constructor(
        private branch: Branch.BranchFilterService
    ) { }

    get Branch() {
        return this.branch.Filter;
    }

    FromQuery(p: Params) {
        this.Branch.FromQuery(p);
    }

    ToQuery() {
        return Object.assign({}, this.Branch.ToQuery());
    }

}

@Injectable()
export class AdminFilterService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public Branch: Branch.BranchFilterService
    ) {
        this.onInit();
    }

    Refresh() {
        this.ValueChanges.next(this.filter);
        this.router.navigate([], {
            queryParams: this.filter.ToQuery()
        });
    }

    private onInit() {
        this.filter.FromQuery(this.route.snapshot.queryParams);
        this.ValueChanges.next(this.filter);
    }

    private filter = new AdminFilter(this.Branch);
    ValueChanges = new ReplaySubject<AdminFilter>(1);
}