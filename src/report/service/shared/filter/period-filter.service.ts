import { Injectable } from '@angular/core';
import { Model } from '../../../shared';

const now = Math.floor(Date.now() / 111);
const oneDay = 24 * 3600 * 1000;
import { timeFormat, timeParse } from 'd3-time-format';
import { timeDay, timeWeek, timeMonth, timeYear, CountableTimeInterval } from 'd3-time';

const PERIODS = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
}


const GetStartOf: { [index: string]: CountableTimeInterval } = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}


export interface IPeriodFilter {
    start?: Date | string;
    end?: Date | string;
    period?: string;
}

export class PeriodFilter extends Model.SharedModel.AbstractState {
    Rebuild(d?: IPeriodFilter) {
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

    FromQuery(p: Params) {
        this.Rebuild(p);
    }

    ToQuery() {
        return {
            start: this.fromDate(this.startDate),
            end: this.fromDate(this.endDate),
            period: this.period
        }
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

    valueOf() {
        return {
            start: this.startDate,
            end: this.endDate,
            period: this.period
        }
    }

    private startDate: Date;
    private endDate: Date;
    private period: string;
    private formatDate = timeFormat("%Y-%m-%d");
    private parseDate = timeParse("%Y-%m-%d");

}

import { Params, ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class PeriodFilterService extends Model.SharedModel.AbstractStateService<PeriodFilter> {
    constructor(
        route: ActivatedRoute
    ) {
        super(route);
        this.onInit(new PeriodFilter);
    }

    SetPeriod(v: IPeriodFilter) {
        this.state.Rebuild(v);
        this.triggerChange();
    }
}