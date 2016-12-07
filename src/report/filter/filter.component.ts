import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { GetServices, GetCounters, GetUsers, RxGroupBy } from './filter.service';
import { Branch } from '../shared/';
import { Locale } from '../../config/';

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


function getFormValue(): IFilter {
    const value: {
        period: string;
        start: Date;
        end: Date;
    } = Form.value;
    const start = new Date(value.start);
    const end = new Date(value.end);

    var res: IFilter;
    var days = start.getDate();
    var months = start.getMonth() + 1;
    var years = start.getFullYear();
    var daye = end.getDate();
    var monthe = end.getMonth() + 1;
    var yeare = end.getFullYear();

    switch (value.period) {
        case "year":
            res = {
                period: value.period,
                start: years + "-01",
                end: yeare + "-12",
            };
            break;
        case "month":
            res = {
                period: value.period,
                start: [years, ((months < 10 ? '0' : '') + months)].join('-'),
                end: [yeare, ((monthe < 10 ? '0' : '') + monthe)].join('-'),
            };
            break;
        case "week":
            res = {
                period: value.period,
                start: week(years, months, days).toString(),
                end: week(yeare, monthe, daye).toString(),
            };
            break;
        case "day":
            res = {
                period: value.period,
                start: [years, ((months < 10 ? '0' : '') + months), (days < 10 ? '0' : '') + days].join('-'),
                end: [yeare, ((monthe < 10 ? '0' : '') + monthe), (daye < 10 ? '0' : '') + daye].join('-'),
            };
            break;
    }

    // const res: IFilter = {
    //     period: value.period,
    //     start: [start.getFullYear(), start.getMonth() +1, start.getDate()].join('-'),
    //     end: [end.getFullYear(), end.getMonth()+1, end.getDate()].join('-'),
    // };
    return res;
}

function week(year, month, day) {
    function serial(days) { return 86400000 * days; }
    function dateserial(year, month, day) { return (new Date(year, month - 1, day).valueOf()); }
    function weekday(date) { return (new Date(date)).getDay() + 1; }
    function yearserial(date) { return (new Date(date)).getFullYear(); }
    var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year, month, day),
        date2 = dateserial(yearserial(date - serial(weekday(date - serial(1))) + serial(4)), 1, 3);
    var week = ~~((date - date2 + serial(weekday(date2) + 5)) / serial(7));
    if (week == 53) {
        year = year - 1;
    }
    return year + "-" + ((week < 10 ? '0' : '') + week);
}

function GetFilter() {
    const filter: IFilter = getFormValue();
    filter.branch_id = Branch.SelectedBranchIDLevel0.value;
    filter.lang = Locale();


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
    form = Form;
    active = '';
    refresh() {
        const filter = GetFilter();
        RxGroupBy.next(filter.group_by);
        RxFilter.next(filter);
    }
}