
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class ReportFilter {
    Branch: Branch.BranchFilter;

    FromQuery(p: Params) {
        this.Branch.FromQuery(p);
    }

    ToQuery() {
        return Object.assign({}, this.Branch.ToQuery());
    }

}

@Injectable()
export class ReportFilterService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private branchFilterService: Branch.BranchFilterService
    ) {
        this.onInit();
    }

    private onInit() {
        this.filter.Branch = this.branchFilterService.Filter;
        this.filter.FromQuery(this.route.snapshot.queryParams);
        this.onChange();
    }

    private onChange() {
        this.branchFilterService.onChange();
        this.ValueChanges.next(this.filter);
    }

    Refresh() {
        this.onChange();
        this.router.navigate([], {
            queryParams: this.filter.ToQuery()
        });
    }

    private filter = new ReportFilter();
    ValueChanges = new ReplaySubject<ReportFilter>(1);
}