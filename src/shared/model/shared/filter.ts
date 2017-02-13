
export class IDList {
    constructor(v: string | string[]) {
        this.rebuild(v);
    }

    rebuild(v: undefined | string | string[]) {
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
    constructor(count = 1) {
        this.levels = [];
        this.max = count - 1;
        for (let i = 0; i <= this.max; i++) {
            this.levels.push(i);
        }
    }

    private max = 0;

    get Max() {
        return this.max;
    }

    private separator = ';';

    rebuild(v: undefined | string | string[] | string[][]) {
        if (!v) {
            v = [];
        }
        if (typeof v === 'string') {
            v = v.split(this.separator) || [];
        }
        this.data = this.toMultipleIdList(v, this.max);
    }

    toArray(): string[] {
        return this.data.reduce((res, arr) => res.concat(arr.valueOf()), []);
    }

    getLowest() {
        let i = 0;
        while (i <= this.max) {
            if (this.data[i] && this.data[i].length > 0) {
                return i;
            }
            i++;
        }
        return this.max
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

interface IMap {
    [index: string]: string;
}

export abstract class AbstractFilter {

    FromQuery(p: Params) {

    }

    ToQuery(): Params {
        return {};
    }

    ToBackendQuery(): IMap {
        return this.ToQuery();
    }
}

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ISubscription } from 'rxjs/Subscription';

export abstract class AbstractFitlerService<T extends AbstractFilter> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) {

    }

    SetLink(link: string) {
        this.link = link;
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
    private link = '';
    private old: ISubscription;

    OnceSubscribe(cb: (v: T) => void) {
        if (this.old) {
            this.old.unsubscribe();
        }
        this.old = this.ValueChanges.subscribe(cb);
    }
}