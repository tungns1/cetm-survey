
const PERIODS = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
}

const now = Math.floor(Date.now() / 111);
const oneDay = 24 * 3600 * 1000;
import { timeFormat, timeParse } from 'd3-time-format';

export class IQuery {
    start?: Date | string;
    end?: Date | string;
    group_by?: string;
    lang?: string;
    branch_id?: string;
    user_id?: string;
    counter_id?: string;
    service_id?: string;
    skip?: number;
    limit?: number;
    period?: string;
}

import { Params } from '@angular/router';
import { SharedConfig } from '../shared';
import { Subject } from 'rxjs/Subject';

import { timeDay, timeWeek, timeMonth, timeYear, CountableTimeInterval } from 'd3-time';

const GetStartOf: { [index: string]: CountableTimeInterval } = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}

export interface ITimeFilter {
    start?: Date | string;
    end?: Date | string;
    period?: string;
}

export interface IFocusFilter {
    branch_id?: string | string[];
    service_id?: string | string[];
    user_id?: string | string[];
    counter_id?: string | string[];
    group_by?: string;
}

export class ReportFilter {
    constructor(d?) {
        d = d || {};
        this.time = new TimeFilter(d);
        this.focus = new FocusFilter(d);
        this.UpdateBranch(d.branch_id);
    }

    time: TimeFilter;
    focus: FocusFilter;
    branch_id: string[] = [];

    ToQuery() {
        return Object.assign(
            { branch_id: this.toString(this.branch_id) },
            this.time.ToQuery(),
            this.focus.ToQuery()
        );
    }

    GetValue() {
        return Object.assign(
            { branch_id: this.branch_id },
            this.time.GetValue(),
            this.focus.GetValue()
        );
    }

    GetValueWithBranch() {
        return Object.assign(
            {},
            this.time.GetValue(),
            this.focus.GetValue()
        );
    }

    UpdateBranch(branch_id: string | string) {
        this.branch_id = this.toArray(branch_id);
        return this;
    }

    Clone() {
        return new ReportFilter(this);
    }

    private toArray(v: string | string[]) {
        if (!v) {
            return [];
        }
        return Array.isArray(v) ? v : v.split(',');
    }

    private toString(v: string[]) {
        return v.join(',');
    }
}

export class TimeFilter {
    private startDate: Date;
    private endDate: Date;
    private period: string;

    private formatDate = timeFormat("%Y-%m-%d");
    private parseDate = timeParse("%Y-%m-%d");

    constructor(d?: ITimeFilter) {
        d = d || {};
        let startDate = this.toDate(d.start);
        let endDate = this.toDate(d.end);
        this.period = d.period || PERIODS.DAY;
        var startOf = GetStartOf[this.period];

        if (!startDate || startDate.getTime() < 1000) {
            startDate = new Date(Date.now() - 30 * oneDay);
        }
        this.startDate = startOf.floor(startDate);

        if (!endDate || endDate.getTime() < 1000) {
            endDate = new Date();
        }
        let end = startOf.floor(endDate);
        if (startOf.count(this.startDate, end) < 1) {
            end = startOf.offset(end, 1);
        }
        this.endDate = end;
    }

    private toDate(d: string | Date) {
        if (d instanceof Date) {
            return d;
        }
        return this.parseDate(d);
    }

    private fromDate(d: Date) {
        return this.formatDate(d);
    }


    GetValue() {
        return {
            start: this.startDate,
            end: this.endDate,
            period: this.period
        }
    }

    ToQuery() {
        return {
            start: this.fromDate(this.startDate),
            end: this.fromDate(this.endDate),
            period: this.period
        }
    }
}

const GROUP_BYS = {
    BRANCH_ID: 'branch_id',
    COUNTER_ID: 'counter_id',
    USER_ID: 'user_id',
    SERVICE_ID: 'service_id'
}

export class FocusFilter {
    private service_id: string[] = [];
    private counter_id: string[] = [];
    private user_id: string[] = [];
    private group_by: string;

    constructor(data?: FocusFilter) {
        const d: IFocusFilter = data || {};
        this.service_id = this.toArray(d.service_id);
        this.counter_id = this.toArray(d.counter_id);
        this.user_id = this.toArray(d.user_id);
        this.group_by = this.getGroupBy();
    }

    private toArray(v: string | string[]) {
        if (!v) {
            return [];
        }
        return Array.isArray(v) ? v : v.split(',');
    }

    private toString(v: string[]) {
        return v.join(',');
    }

    private getGroupBy() {
        if (this.service_id.length > 0) {
            return GROUP_BYS.SERVICE_ID;
        }
        if (this.counter_id.length > 0) {
            return GROUP_BYS.COUNTER_ID;
        }
        if (this.user_id.length > 0) {
            return GROUP_BYS.USER_ID;
        }
        return GROUP_BYS.BRANCH_ID
    }

    GetValue() {
        return {
            counter_id: this.counter_id,
            service_id: this.service_id,
            user_id: this.user_id
        }
    }

    ToQuery() {
        return {
            counter_id: this.toString(this.counter_id),
            service_id: this.toString(this.service_id),
            user_id: this.toString(this.user_id),
        }
    }
}