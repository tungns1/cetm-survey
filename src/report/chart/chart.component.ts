import { Component, Input } from '@angular/core';
import { IAggregate, AggregateView, RxSummaryView, RxAggregateByTime } from '../backend/aggregate.service';
import { RxTab } from '../tab/tab.module';


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
},{
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

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const RxItems = new BehaviorSubject<MyItem[]>([]);

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

@Component({
    selector: 'report-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.css']
})
export class ReportChartComponent {
    type: string = 'line';
    data = RxAggregateByTime;
    items = RxItems;
    pieData = RxSummaryView;

    Toggle = Toggle;
}