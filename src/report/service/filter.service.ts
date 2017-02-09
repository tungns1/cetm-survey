import { Model, Branch } from '../shared/';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FocusBranchService } from './focus.service';

const now = Math.floor(Date.now() / 111);
import { IFilter } from '../model';

export const RxGroupBy = new BehaviorSubject<string>('branch_id');
export const RxPeriod = new BehaviorSubject<string>('day');

const Titles = {
    branch_id: "TRANSACTION_ROOM",
    service_id: 'SERVICE',
    counter_id: 'COUNTER',
    user_id: 'TELLERS'
}

export const RxGroupTitle = RxGroupBy.map(group => Titles[group]);

import { timeFormat } from 'd3-time-format';
import { timeDay, timeWeek, timeMonth, timeYear, CountableTimeInterval } from 'd3-time';

const GetStartOf: { [index: string]: CountableTimeInterval } = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}

const oneDay = 24 * 3600 * 1000;


const dayFormat = timeFormat("%Y-%m-%d");

import { SharedConfig } from '../shared';
import { FormBuilder } from '@angular/forms';

import { Injectable } from '@angular/core';


@Injectable()
export class FilterService {
    constructor(
        private focusService: FocusBranchService
    ) {
        this.currentFilter.lang = SharedConfig.Setting().culture;
        this.onInit();
    }

    private activeRes = function (filter: IFilter) {

    }

    SetRefresh(func: (filter: IFilter) => void) {
        this.activeRes = func
        this.Refresh(this.GetFilter());
    }

    Refresh(filter: IFilter) {
        this.activeRes(filter)
    }

    GetFilter() {
        const filter = this.currentFilter;
        let group_by = 'branch_id';
        filter.group_by = group_by;
        return filter;
    }

    SetFormValue(value: {
        period: string;
        start: Date;
        end: Date;
    }) {
        var startOf = GetStartOf[value.period];
        const start = startOf.floor(value.start);
        let end = startOf.floor(value.end);
        if (startOf.count(start, end) < 1) {
            end = startOf.offset(end, 1);
        }

        this.currentFilter.period = value.period;
        this.currentFilter.start = dayFormat(start);
        this.currentFilter.end = dayFormat(end);
        return this.currentFilter;
    }

    get CurrentFilter() {
        return this.currentFilter;
    }

    private onInit() {
        Branch.SelectedBranchIDLevel0.subscribe(id => {
            this.CurrentFilter.branch_id = id;
        });

        this.focusService.RxDetails.subscribe(details => {
            if (details.users && details.users.length > 0) {
                this.currentFilter.user_id = details.users.map(u => u.id).join(',');
            }
            if (details.counters && details.counters.length > 0) {
                this.currentFilter.counter_id = details.counters.map(c => c.id).join(',');
            }
            if (details.services && details.services.length > 0) {
                const services = details.services;
                this.currentFilter.service_id = services.map(s => s.id).join(',');
            }
        });

    }

    private currentFilter = <IFilter>{
        period: 'day',
        start: new Date(Date.now() - 30 * oneDay),
        end: new Date()
    };
}
