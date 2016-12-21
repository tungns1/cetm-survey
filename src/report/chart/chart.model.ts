
import { Item } from '../chart/d3/chart';

interface MyItem extends Item {
    tab: string;
    title: string;
}

const Fields: MyItem[] = [{
    field: 'c_t',
    color: 'steelblue',
    tab: 'general',
    title: 'Tổng số giao dịch'
}, {
    field: 'c_ft',
    color: '#009900',
    tab: 'general',
    title: 'Giao dịch thành công'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    title: 'Giao dịch bị hủy'
}, {
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    title: 'Thời gian đợi (giờ)',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    title: 'Thời gian phục vụ (giờ)'
}, {
    field: 'c_r_a',
    tab: 'customer',
    color: 'steelblue',
    title: 'Phản hồi tốt'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: 'green',
    title: 'Phản hồi khá'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: 'brown',
    title: 'Phản hồi trung bình'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: 'orange',
    title: 'Phản hồi kém'
}];

import { RxTab } from '../tab/tab.module';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxItems = new BehaviorSubject<MyItem[]>([]);

RxTab.subscribe(t => {
    const fields = Fields.filter(v => v.tab === t);
    RxItems.next(fields);
});

export function Toggle(item: MyItem) {
    const items: MyItem[] = [];
    RxItems.value.forEach(i => {
        if (i.field === item.field) {
            i._hidden = !i._hidden;
        }
        items.push(i);
    });
    RxItems.next(items);
}

import { timeParse } from 'd3-time-format';

import { IAggregate, AggregateView, RxSummaryView, RxAggregate, MakeIndexBy } from '../backend/aggregate.service';
import { RxPeriod } from '../filter/';

const timeDay = timeParse("%Y-%m-%d");
const timeWeek = timeParse("%Y-%W");
const timeMonth = timeParse("%Y-%m");
const timeYear = timeParse("%Y");

const TimeParse = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}

export const RxAggregateByTime = RxAggregate.map(records => {
    const views = MakeIndexBy(records, 'time');
    const parseTime = TimeParse[RxPeriod.value];
    // views.sort((a, b) => a.time > b.time ? 1 : -1);
    views.forEach(v => {
        v.date = parseTime(v.time);
    })
    views.sort((a, b) => a.date < b.date? -1 : 1);
    return views;
});
