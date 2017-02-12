
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
import { Org } from '../../model';

export class BranchFilter {

    FromQuery(p: Params) {
        const branch_id = p['branch_id'];
        this.setBranchID(this.toArray(branch_id));
        // check the highest       
        this.checkTheRoot();
    }

    ToQuery() {
        const branch_id = this.branch_id.map(idListToString);
        return {
            once: Date.now(),
            branch_id: this.toString(branch_id)
        }
    }

    private checkTheRoot() {
        const maxLevel = this.levels.length - 1;
        const branchAtRoot = Org.CacheBranch.GetByLevel(maxLevel);
        this.branch_id[maxLevel] = branchAtRoot.map(b => b.id);
    }

    private toArray(v: string) {
        return v ? v.split(";") : [];
    }

    GetBranchID() {
        return this.branch_id;
    }

    GetArrayBranchID() {
        return this.branch_id.reduce((res, arr) => res.concat(arr), []);
    }

    SetBranchID(value: IDList[]) {
        this.setBranchID(value);
    }

    GetBranchIDByLevel(level = 0) {
        return this.branch_id[level] || [];
    }

    GetBranchIDAtLowestLevel() {
        const len = this.branch_id.length;
        for (let i = 0; i < len; i++) {
            if (this.branch_id[i] && this.branch_id[i].length > 0) {
                return this.branch_id[i];
            }
        }
        return [];
    }

    GetLowestLevel() {
        const len = this.branch_id.length;
        let i = 0;
        while (i < len) {
            if (this.branch_id[i] && this.branch_id[i].length > 0) {
                break;
            }
            i++;
        }
        return i;
    }

    private toString(arr: string[]) {
        return arr.join(';');
    }

    private setBranchID(value: string[] | IDList[]) {
        this.branch_id = this.levels.map(l => value[l] || []).map(toIdList);
    }

    get Levels() {
        return this.levels;
    }

    private branch_id: IDList[] = [];

    // top down 
    private levels = Org.BranchLevels.map(v => v.value).sort((a, b) => a < b ? -1 : 1)
}

import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class BranchFilterService {
    constructor() {
        console.log('create');
    }

    onChange() {
        this.ValueChanges.next(this.filter);
    }

    FromQuery(p: Params) {
        this.filter.FromQuery(p);
        this.onChange();
    }

    get Levels() {
        return this.filter.Levels;
    }

    GetBranchID() {
        return this.filter.GetBranchID();
    }

    SetBranchID(branch_id: IDList[]) {
        this.filter.SetBranchID(branch_id);
        this.onChange();
    }

    get Filter() {
        return this.filter;
    }

    private filter = new BranchFilter();
    ValueChanges = new ReplaySubject<BranchFilter>(1);
}