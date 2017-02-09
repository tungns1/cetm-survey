import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Model, SharedService, Branch } from '../shared/';

export interface IFilter {
    period?: string;
    start?: string;
    end?: string;
    group_by?: string;
    lang?: string;
    branch_id?: string;
    user_id?: string;
    counter_id?: string;
    service_id?: string;
    skip?: number;
    limit?: number;

}

import { Subject } from 'rxjs/Subject';
export const RxFilter = new Subject<IFilter>();

const backend = new SharedService.Backend.HttpApi("/api/auth");

const now = Math.floor(Date.now() / 111);

// import 'rxjs/add/operator/switchMap';

const RxDetails = Branch.SelectedBranchIDLevel0.filter(id => !!id).switchMap(id => {
    return backend.Get("details", { branch_id: id });
});

export const RxServices = new BehaviorSubject<Model.Center.IService[]>([]);
export const RxUsers = new BehaviorSubject<Model.IUser[]>([]);
export const RxCounters = new BehaviorSubject<Model.House.ICounter[]>([]);
export const NameMap = new Map<string, string>();

Model.Center.CacheService.RxListView.subscribe(services => {
    services.sort((a, b) => a.name > b.name ? 1 : -1);
    RxServices.next(services);
    services.forEach(s => NameMap.set(s.id, s.name));
})

RxDetails.subscribe(v => {
    const counters: Model.House.ICounter[] = v['counters'];
    counters.sort((a, b) => a.name > b.name ? 1 : -1);
    RxCounters.next(counters);
    const users: Model.IUser[] = v['users'];
    for (let i = 0; i < users.length; i++) {
        if (users[i].role != 'staff') {
            users.splice(i, 1);
        }
    }
    users.sort((a, b) => a.fullname > b.fullname ? 1 : -1);
    RxUsers.next(users);
    users.forEach(u => NameMap.set(u.id, u.fullname));
    counters.forEach(c => NameMap.set(c.id, c.name));
})

Branch.RxBranches.subscribe(branches => branches.forEach(b => NameMap.set(b.id, b.name)));

function GetSelected(value: { id?: string, _checked?: boolean }[]) {
    return value.filter(v => v._checked).map(v => v.id);
}

export function GetServices() {
    return RxServices.value.filter(v => v._checked).map(v => v.id);
}
export function GetBranch() {
    return Branch.RxBranches.value.filter(v => v._checked && v.level === 0).map(v => v.id);
}

export function GetCounters() {
    return GetSelected(RxCounters.value);
}

export function GetUsers() {
    return GetSelected(RxUsers.value);
}

export const RxGroupBy = new BehaviorSubject<string>('branch_id');
export const RxPeriod = new BehaviorSubject<string>('day');

const Titles = {
    branch_id: "TRANSACTION_ROOM",
    service_id: 'SERVICE',
    counter_id: 'COUNTER',
    user_id: 'TELLERS'
}

export const RxGroupTitle = RxGroupBy.map(group => Titles[group]);


import { timeFormat } from 'd3-time-format';
import { timeDay, timeWeek, timeMonth, timeYear, CountableTimeInterval } from 'd3-time';

const GetStartOf: { [index: string]: CountableTimeInterval } = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}

const dayFormat = timeFormat("%Y-%m-%d");

function getFormValue(): IFilter {
    const value: {
        period: string;
        start: Date;
        end: Date;
    } = Form.value;
    var startOf = GetStartOf[value.period];
    const start = startOf.floor(value.start);
    let end = startOf.floor(value.end);
    if (startOf.count(start, end) < 1) {
        end = startOf.offset(end, 1);
    }
    const res: IFilter = {};
    res.period = value.period;
    res.start = dayFormat(start);
    res.end = dayFormat(end);
    return res;
}

import { SharedConfig } from '../shared';
import { FormBuilder } from '@angular/forms';

export function GetFilter() {
    const filter: IFilter = getFormValue();
    filter.branch_id = Branch.SelectedBranchIDLevel0.value;
    filter.lang = SharedConfig.Setting().culture;

    let group_by = 'branch_id';

    const services = GetServices();
    if (services.length > 0) {
        filter.service_id = services.join(',');
        group_by = 'service_id';
    }

    const counters = GetCounters();
    if (counters.length > 0) {
        filter.counter_id = counters.join(',');
        group_by = 'counter_id';
    }

    const users = GetUsers();
    if (users.length > 0) {
        filter.user_id = users.join(',');
        group_by = 'user_id';
    }

    filter.group_by = group_by;

    return filter;
}

const oneDay = 24 * 3600 * 1000;

export const Form = (new FormBuilder).group({
    period: ['day'],
    start: [new Date(Date.now() - 30 * oneDay)],
    end: [new Date()]
});

export class FilterService {
    
}