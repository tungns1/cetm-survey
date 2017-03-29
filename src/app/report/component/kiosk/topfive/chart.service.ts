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

import { KioskAPI } from '../service/kiosk.service';

import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {
    constructor(
        private kioskAPI: KioskAPI
    ) { }

    private RxCustomer = this.kioskAPI.RxCustomer;
  
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