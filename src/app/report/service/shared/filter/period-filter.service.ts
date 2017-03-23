import { Injectable } from '@angular/core';

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
    start: string;
    end: string;
    period?: string;
}

import { SmallStorage, RouterQueryStorageStrategy } from '../../../shared';

@Injectable()
export class PeriodFilterService extends SmallStorage<IPeriodFilter> {
    constructor(
        storageStrategy: RouterQueryStorageStrategy
    ) {
        super("period", storageStrategy);
        this.setDefault();
    }

    private setDefault() {
        this.Update(
            this.parseDate(this.data.start),
            this.parseDate(this.data.end),
            this.data.period
        );
    }

    ToQuery() {
        let end = this.parseDate(this.data.end);
        let startOf = GetStartOf[this.data.period];
        let start = this.parseDate(this.data.start);
        if (startOf.count(start, end) < 1) {
            end = startOf.offset(start, 1);
        }

        return {
            start: this.formatDate(start),
            end: this.formatDate(end),
            period: this.data.period
        }
    }

    Update(start: Date, end: Date, period: string) {
        this.data.period = period || PERIODS.DAY;
        var startOf = GetStartOf[this.data.period];
        if (!start || start.getTime() < 1000) {
            start = new Date(Date.now() - 30 * oneDay);
        }
        this.data.start = this.formatDate(startOf.floor(start));
        if (!end || end.getTime() < 1000) {
            end = new Date();
        }
        this.data.end = this.formatDate(startOf.floor(end));
        this.SaveData();
    }


    private formatDate = timeFormat("%Y-%m-%d");
    private parseDate = timeParse("%Y-%m-%d");

    get startDate() {
        return this.parseDate(this.data.start);
    }

    get endDate() {
        return this.parseDate(this.data.end);
    }

    get period() {
        return this.data.period;
    }

}
