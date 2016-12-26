
import { Item } from '../chart/d3/chart';

interface MyItem extends Item {
    tab: string;
    title: string;
}

const Fields: MyItem[] = [{
    field: 'c_t',
    color: '#9933ff',
    tab: 'general',
    title: 'Tổng số giao dịch'
}, {
    field: 'c_ft',
    color: '#99b3ff',
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
    title: 'Thời gian đợi',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    title: 'Thời gian phục vụ'
}, {
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    title: 'Phản hồi tốt'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    title: 'Phản hồi khá'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    title: 'Phản hồi trung bình'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    title: 'Phản hồi kém'
}];

const FieldPie: MyItem[][] = [[{
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    title: 'Giao dịch thành công'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    title: 'Giao dịch bị hủy'
}], [{
    field: 'c_bwt',
    color: '#339933',
    tab: 'general',
    title: 'Giao dịch đợi chuẩn'
}, {
    field: 'c_awt',
    color: '#b4e4b4',
    tab: 'general',
    title: 'Giao dịch đợi vượt chuẩn'
}], [{
    field: 'c_bst',
    color: '#339966',
    tab: 'general',
    title: 'Giao dịch phục vụ chuẩn'
}, {
    field: 'c_ast',
    color: '#9fdfbf',
    tab: 'general',
    title: 'Giao dịch phục vụ vượt chuẩn'
}], [{
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    title: 'Thời gian đợi',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    title: 'Thời gian phục vụ'
}], [{
    field: 'c_r',
    color: '#99b3ff',
    tab: 'customer',
    title: 'Giao dịch có phản hồi'
}, {
    field: 'c_r_o',
    color: '#969c9c',
    tab: 'customer',
    title: 'Giao dịch không có phản hồi'
}], [{
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    title: 'Phản hồi tốt'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    title: 'Phản hồi khá'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    title: 'Phản hồi trung bình'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    title: 'Phản hồi kém'
}]];


import { RxTab } from '../tab/tab.module';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxItems = new BehaviorSubject<MyItem[]>([]);
export const RxItemPie = new BehaviorSubject<MyItem[][]>([]);
export const RxW = new BehaviorSubject<number>(0);

RxTab.subscribe(t => {
    const fields = Fields.filter(v => v.tab === t);
    RxItems.next(fields);
    let data: MyItem[][] = [];
    FieldPie.forEach(v => {
        let field = v.filter(s => s.tab === t);
        if (field.length>0) {
            data.push(field);
        }

    });
    RxW.next(data.length);
    RxItemPie.next(data);

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
export function TogglePie(item: MyItem) {
    const items: MyItem[][] = [];
    RxItemPie.value.forEach(i => {
        let data:MyItem[]=[];
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
import { timeParse } from 'd3-time-format';

import { IAggregate, AggregateView, RxSummaryView, RxAggregate, MakeIndexBy } from '../backend/aggregate.service';
import { RxPeriod } from '../filter/';

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

export const RxAggregateByTime = RxAggregate.map(records => {
    const views = MakeIndexBy(records, 'ctime');
    const parseTime = TimeParse[RxPeriod.value];
    // views.sort((a, b) => a.time > b.time ? 1 : -1);
    views.forEach(v => {
        v.date = parseTime(v.ctime);
    })
    views.sort((a, b) => a.date < b.date ? -1 : 1);
    return views;
});
