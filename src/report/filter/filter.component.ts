import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { GetServices, GetCounters, GetUsers, RxGroupBy, RxPeriod } from './filter.service';
import { Branch } from '../shared/';
import { Setting } from '../../config/';

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
    const end = startOf.ceil(value.end);
    const res: IFilter = {};
    res.period = value.period;
    res.start = dayFormat(start);
    res.end = dayFormat(end);
    return res;
}

export function GetFilter() {
    const filter: IFilter = getFormValue();
    filter.branch_id = Branch.SelectedBranchIDLevel0.value;
    filter.lang = Setting().culture;

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

const Form = (new FormBuilder).group({
    period: ['day'],
    start: [new Date(Date.now() - 30 * oneDay)],
    end: [new Date()]
});


@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class ReportFilterComponent {
    @Output() filter = new EventEmitter();
    form = Form;
    active = '';
    refresh() {
        const filter = GetFilter();
        RxGroupBy.next(filter.group_by);
        RxPeriod.next(filter.period);
        this.filter.next(filter);
    }
}