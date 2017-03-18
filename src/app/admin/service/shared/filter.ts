
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchFilterService, AbstractState, BranchFilter, AbstractStateService } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class AdminFilter extends AbstractState {
    constructor(
        public Branch: BranchFilter
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
export class AdminFilterService extends AbstractStateService<AdminFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilterService: BranchFilterService
    ) {
        super(route);
        this.onInit(new AdminFilter(this.branchFilterService.Current));
    }
}