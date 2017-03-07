import { ChartItem, FresItems, ServiceItems, StoreItems } from './chart.model';

import { timeParse } from 'd3-time-format';
import { Customer } from '../../shared';

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
    RxFres = this.RxSummaryView.map(v => {
        var fres = v.fres;
        const parseTime = TimeParse[this.RxPeriod.value];
        fres.forEach(v => {
            v.date = parseTime(v.cdate);
        })
        fres.sort((a, b) => a.date < b.date ? -1 : 1);
        return fres;
    })
    RxStore = this.RxSummaryView.map(v => {
        var stores = v.stores;
        stores.sort(function (a, b) {
            return a.count - b.count;
        })

        return stores;
    })
    RxService = this.RxSummaryView.map(v => {
        var services = v.services;
        services.sort(function (a, b) {
            return a.count - b.count;
        })
        return services;
    })
    get RxSummaryView() {
        return this.RxCustomer.map(Customer.Make);
    };

    RxPeriod = this.customerAPI.period$;
}