import { Injectable } from '@angular/core';
import { timeFormat, timeParse } from 'd3-time-format';
import { timeDay, timeWeek, timeMonth, timeYear, CountableTimeInterval } from 'd3-time';
import { SmallStorage, RouterQueryStorageStrategy } from '../../shared';

const now = Math.floor(Date.now() / 111);
const oneDay = 24 * 3600 * 1000;

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
    period: 'day' | 'week' | 'month' | 'year';
}


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
        end = startOf.offset(end, 1);

        return {
            start: this.formatDate(start),
            end: this.formatDate(end),
            period: this.data.period
        }
    }

    Update(start: Date, end: Date, period: 'day' | 'week' | 'month' | 'year') {
        this.data.period = period || 'day';
        var startOf = GetStartOf[this.data.period];
        if (!start || start.getTime() < 1000) {
            start = new Date(Date.now() - 30 * oneDay);
        }
        // this.data.start = this.formatDate(startOf.floor(start));
        this.data.start = this.formatDate(start);
        if (!end || end.getTime() < 1000) {
            end = new Date();
        }
        // console.log(JSON.stringify(end))
        // this.data.end = this.formatDate(startOf.floor(end));
        this.data.end = this.formatDate(end);
        // console.log(JSON.stringify(this.data['end']))
        this.SaveData(true);
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
