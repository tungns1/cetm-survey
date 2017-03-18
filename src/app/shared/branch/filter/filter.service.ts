import { Injectable } from '@angular/core';
import { BranchLevels, AbstractState, CacheBranch, AbstractStateService, MultipleIDList } from '../../model';

export class BranchFilter extends AbstractState {
    constructor() {
        super();
        this.branch_id = new MultipleIDList(BranchLevels.length);
    }

    FromQuery(p: Params) {
        const branch_id = p['branch_id'];
        this.branch_id.rebuild(branch_id);
        // check the highest       
        this.checkTheRoot();
    }

    ToQuery() {
        return {
            branch_id: this.branch_id.toString()
        }
    }

    valueOf() {
        return this.branch_id.valueOf();
    }

    private checkTheRoot() {
        const maxLevel = this.branch_id.Max;
        const branchAtRoot = CacheBranch.GetByLevel(maxLevel);
        this.branch_id.set(maxLevel, branchAtRoot.map(b => b.id)) ;
    }

    GetBranchID() {
        return this.branch_id.valueOf();
    }

    GetArrayBranchID() {
        return this.branch_id.toArray();
    }

    SetBranchID(value: string[][]) {
        this.branch_id.rebuild(value);
    }

    GetBranchIDByLevel(level = 0): string[] {
        return this.branch_id.at(level) || [];
    }

    GetBranchIDAtLowestLevel() {
        return this.branch_id.at(this.branch_id.getLowest()) || [];
    }

    GetLowestLevel() {
        return this.branch_id.getLowest();
    }

    get Levels() {
        return this.branch_id.Levels;
    }

    private branch_id: MultipleIDList;
}

import { Params, ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class BranchFilterService extends AbstractStateService<BranchFilter> {
    constructor(
        route: ActivatedRoute
    ) {
        super(route);
        this.onInit(new BranchFilter);
    }

    get Levels() {
        return this.state.Levels;
    }

    GetBranchID() {
        return this.state.GetBranchID();
    }

    SetBranchID(branch_id: string[][]) {
        this.state.SetBranchID(branch_id);
        this.triggerChange();
    }
}