
type IDList = string[];

function toIdList(v: string | string[]) {
    if (Array.isArray(v)) {
        return v;
    }
    return v ? v.split(',') : [];
}

function idListToString(d: IDList) {
    return d.join(',');
}

import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../../shared';

@Injectable()
export class AdminFilterService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.onInit();
    }

    Refresh() {
        this.router.navigate([], {
            queryParams: this.toQuery()
        });
    }

    private onInit() {
        this.fromQuery(this.route.snapshot.queryParams);
        console.log("on", this.branch_id);
    }

    private fromQuery(p: Params) {
        const branch_id = p['branch_id'];
        this.SetBranchID(this.toArray(branch_id));
    }

    private toQuery() {
        const branch_id = this.branch_id.map(idListToString);
        return {
            branch_id: this.toString(branch_id)
        }
    }

    GetBranchID() {
        return this.branch_id;
    }

    SetBranchID(value: string[] | IDList[]) {
        this.branch_id = this.levels.map(l => value[l] || []).map(toIdList);
    }

    private toArray(v: string) {
        return v ? v.split(";") : [];
    }

    private toString(arr: string[]) {
        return arr.join(';');
    }

    get Levels() {
        return this.levels;
    }

    private branch_id: IDList[] = [];
    
    // top down 
    private levels = Model.Org.BranchLevels.map(v => v.value).sort((a, b) => a > b ? -1 : 1)
}