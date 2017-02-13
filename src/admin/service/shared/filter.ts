
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class AdminFilter extends Model.SharedModel.AbstractState {
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
export class AdminFilterService extends Model.SharedModel.AbstractStateService<AdminFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilterService: Branch.BranchFilterService
    ) {
        super(route);
        this.onInit(new AdminFilter(this.branchFilterService.Current));
    }

    triggerChange() {
        this.branchFilterService.Refresh();
        super.triggerChange();
    }
}