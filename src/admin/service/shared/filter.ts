
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class AdminFilter extends Model.SharedModel.AbstractFilter {
    constructor(
        public Branch: Branch.BranchFilter
    ) {
        super();
     }

    FromQuery(p: Params) {
        this.Branch.FromQuery(p);
    }

    ToQuery() {
        return Object.assign({}, this.Branch.ToQuery());
    }

}

@Injectable()
export class AdminFilterService extends Model.SharedModel.AbstractFitlerService<AdminFilter> {
    constructor(
        route: ActivatedRoute,
        router: Router,
        private branchFilterService: Branch.BranchFilterService
    ) {
        super(route, router);
        this.onInit(new AdminFilter(this.branchFilterService.Filter));
    }

    protected onChange() {
        this.branchFilterService.onChange();
        super.onChange();
    }
}