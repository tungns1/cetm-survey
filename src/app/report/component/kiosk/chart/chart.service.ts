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
    Time = [
        {
            "name": "Active Time",
            "series": [
            ]
        }
    ];
        Ticket = [
        {
            "name": "Ticket Quantity",
            "series": [
            ]
        }
    ];

    private RxCustomer = this.kioskAPI.RxCustomer;
    RxTime = this.RxSummaryView.map(v => {
        var time = this.Time;
        time[0].series = v.time;
        return time;
    })
     RxTicket = this.RxSummaryView.map(v => {
        var ticket = this.Ticket;
        ticket[0].series = v.ticket;
        return ticket;
    })
  
    get RxSummaryView() {
        return this.RxCustomer.map(Customer.Make);
    };
}