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
    Fres = [
        {
            "name": "Frequency",
            "series": [
            ]
        }
    ];

    private RxCustomer = this.customerAPI.RxCustomer;
    RxFres = this.RxSummaryView.map(v => {
        var fres = this.Fres;
        fres[0].series = v.fres;
        return fres;
    })
    RxStore = this.RxSummaryView.map(v => {
        var stores = v.stores;
        return stores;
    })
    RxService = this.RxSummaryView.map(v => {
        var services = v.services;
        return services;
    })
    get RxSummaryView() {
        return this.RxCustomer.map(Customer.Make);
    };

    RxPeriod = this.customerAPI.period$;
}