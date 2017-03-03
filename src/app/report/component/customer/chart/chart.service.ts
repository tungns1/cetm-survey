import { ChartItem, MainItems, PieItems } from './chart.model';

import { timeParse } from 'd3-time-format';
import { MakeIndexBy, Customer } from '../../shared';

const timeDay = timeParse("%Y-%m-%d");
const timeWeek = timeParse("W%Y-%W");
const timeMonth = timeParse("%Y-%m");
const timeYear = timeParse("%Y");

const TimeParse = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}

import { CustomerAPI } from '../service/customer.service';

import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {
    constructor(
        private customerAPI: CustomerAPI
    ) { }

    private RxCustomer = this.customerAPI.RxCustomer;

    RxCustomerByTime = this.RxCustomer.map(records => {
        const views = MakeIndexBy(records, 'ctime');
        const parseTime = TimeParse[this.RxPeriod.value];
        // views.sort((a, b) => a.time > b.time ? 1 : -1);
        views.forEach(v => {
            v.date = parseTime(v.ctime);
        })
        views.sort((a, b) => a.date < b.date ? -1 : 1);
        return views;
    });

    get RxSummaryView() {
        return this.RxCustomer.map(Customer.Make);
    };

    RxPeriod = this.customerAPI.period$;
}