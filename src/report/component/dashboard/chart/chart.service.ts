import { ChartItem, Fields, FieldPie } from './chart.model';
import { RxTab } from '../tab/tab.module';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxItems = new BehaviorSubject<ChartItem[]>([]);
export const RxItemPie = new BehaviorSubject<ChartItem[][]>([]);
export const RxW = new BehaviorSubject<number>(0);

import { combineLatest } from 'rxjs/observable/combineLatest';

import { timeParse } from 'd3-time-format';

import { MakeIndexBy, Aggregate } from '../../shared';

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

import { AggregateService, Lib } from '../../shared';

import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {
    constructor(
        private aggregateService: AggregateService,
        private translateService: Lib.I18n.TranslateService
    ) { }

    private RxAggregate = this.aggregateService.RxAggregate;
    RxAggregateByTime = this.RxAggregate.map(records => {
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
        return this.RxAggregate.map(Aggregate.Make);
    };

    RxPeriod = this.aggregateService.RxPeriod;

    private onInit() {
        const fields = Fields.filter(v => v.tab === RxTab.value);
        fields.forEach(f => f.title = this.translateService.instant(f.key_title));
        RxItems.next(fields);
        let data: ChartItem[][] = [];
        FieldPie.forEach(v => {
            let field = v.filter(s => s.tab === RxTab.value);
            field.forEach(f => f.title = this.translateService.instant(f.key_title));
            if (field.length > 0) {
                data.push(field);
            }

        });
        RxW.next(data.length);
        RxItemPie.next(data);
    }


    Toggle(item: ChartItem) {
        const items: ChartItem[] = [];
        RxItems.value.forEach(i => {
            if (i.field === item.field) {
                i._hidden = !i._hidden;
            }
            items.push(i);
        });
        RxItems.next(items);
    }


    TogglePie(item: ChartItem) {
        const items: ChartItem[][] = [];
        RxItemPie.value.forEach(i => {
            let data: ChartItem[] = [];
            i.forEach(v => {
                if (v.field === item.field) {
                    v._hidden = !v._hidden;
                }
                data.push(v);
            })
            items.push(data);
        });
        RxItemPie.next(items);
    }

    RxItems = RxItems;
    RxW = RxW;
    RxItemPie = RxItemPie;
}