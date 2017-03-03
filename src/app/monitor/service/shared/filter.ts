
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model, Branch } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class MonitorFilter extends Model.SharedModel.AbstractState {
    constructor(
        public Branch: Branch.BranchFilter
    ) {
        super();
    }

    FromQuery(p: Params) {
        this.Branch.FromQuery(p);
        this.focus = p['focus'] || '';
    }

    ToQuery() {
        return Object.assign(
            {},
            this.Branch.ToQuery(), {
                focus: this.focus
            }
        );
    }

    private focus: string;

    Focus(branch_id: string) {
        this.focus = branch_id || '';
    }

    GetFocus() {
        return this.focus;
    }
}

@Injectable()
export class MonitorFilterService extends Model.SharedModel.AbstractStateService<MonitorFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilterService: Branch.BranchFilterService
    ) {
        super(route);
        this.onInit(new MonitorFilter(this.branchFilterService.Current));
    }

    SetFocus(branch_id: string) {
        this.Current.Focus(branch_id);
        this.triggerChange();
    }


}