
export class IDList {
    constructor(v: string | string[]) {
        this.data = this.toIdList(v);
    }

    private data: string[] = [];
    protected toIdList(v: undefined | string | string[]) {
        if (!v) {
            return [];
        }
        if (Array.isArray(v)) {
            return v;
        }
        return v.split(',');
    }

    get length() {
        return this.data.length;
    }

    valueOf() {
        return this.data;
    }

    toString() {
        return this.idListToString(this.data);
    }

    protected idListToString(d: string[]) {
        return d.join(',');
    }

    private seperator = ',';

}

export class MultipleIDList {
    constructor(private len = 0) {
        this.levels = [];
        for (let i = 0; i < len; i++) {
            this.levels.push(i);
        }
    }

    get Max() {
        return this.levels.length - 1;
    }

    private separator = ';';

    rebuild(v: undefined | string | string[] | string[][]) {
        if (!v) {
            v = [];
        }
        if (typeof v === 'string') {
            v = v.split(this.separator) || [];
        }
        this.data = this.toMultipleIdList(v, this.len);
    }

    toArray(): string[] {
        return this.data.reduce((res, arr) => res.concat(arr.valueOf()), []);
    }

    getLowest() {
        const len = this.data.length;
        let i = 0;
        while (i < len) {
            if (this.data[i] && this.data[i].length > 0) {
                break;
            }
            i++;
        }
        return i;
    }

    at(i: number) {
        return this.data[i].valueOf();
    }

    protected toMultipleIdList(v: string[] | string[][], len = 0) {
        return this.levels.map(l => new IDList(v[l] || []));
    }

    protected multipleIdListToString(v: IDList[]) {
        return v.map(d => d.toString()).join(this.separator);
    }

    valueOf() {
        return this.data.map(d => d.valueOf());
    }

    toString() {
        return this.multipleIdListToString(this.data);
    }

    get Levels() {
        return this.levels;
    }

    private data: IDList[] = [];
    private levels: number[] = [];
}

import { Params, ActivatedRoute, Router } from '@angular/router';

export abstract class AbstractFilter {

    FromQuery(p: Params) {

    }

    ToQuery(): Params {
        return {};
    }
}

import { ReplaySubject } from 'rxjs/ReplaySubject';

export abstract class AbstractFitlerService<T extends AbstractFilter> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) {

    }

    Refresh() {
        this.onChange();
        this.router.navigate([], {
            queryParams: this.filter.ToQuery()
        });
    }

    protected onInit(filter: T) {
        this.filter = filter;
        this.filter.FromQuery(this.route.snapshot.queryParams);
        this.onChange();
    }

    protected onChange() {
        this.ValueChanges.next(this.filter);
    }

    protected FromQuery(p: Params) {
        this.filter.FromQuery(p);
        this.onChange();
    }

    get Filter() {
        return this.filter;
    }

    protected filter: T;
    ValueChanges = new ReplaySubject<T>(1);
}