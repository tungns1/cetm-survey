import { SharedService } from '../../shared';

import { Item } from '../chart/d3/chart';

interface MyItem extends Item {
    tab: string;
    title?: string;
    key_title: string;
}

const Fields: MyItem[] = [{
    field: 'c_t',
    color: '#9933ff',
    tab: 'general',
    key_title: 'GENERAL.TOTAL_TRANSACTION'
}, {
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_FINISH'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_CANCEL'
}, {
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    key_title: 'GENERAL.TIME_WAIT',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    key_title: 'GENERAL.TIME_SERVING'
}, {
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    key_title: 'GENERAL.FEEDBACK_VERY_GOOD'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    key_title: 'GENERAL.FEEDBACK_GOOD'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    key_title: 'GENERAL.FEEDBACK_MEDIUM'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    key_title: 'GENERAL.FEEDBACK_BAD'
}];

const FieldPie: MyItem[][] = [[{
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_FINISH'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_CANCEL'
}], [{
    field: 'c_bwt',
    color: '#339933',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_WAIT_STANDARD'
}, {
    field: 'c_awt',
    color: '#b4e4b4',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_WAIT_BEYOND_STANDARD'
}], [{
    field: 'c_bst',
    color: '#339966',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_SERVING_STANDARD'
}, {
    field: 'c_ast',
    color: '#9fdfbf',
    tab: 'general',
    key_title: 'GENERAL.TRANSACTION_SERVING_BEYOND_STANDARD'
}], [{
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    key_title: 'GENERAL.TIME_WAIT',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    key_title: 'GENERAL.TIME_SERVING'
}], [{
    field: 'c_r',
    color: '#99b3ff',
    tab: 'customer',
    key_title: 'GENERAL.TRANSACTION_FEEDBACK'
}, {
    field: 'c_r_o',
    color: '#969c9c',
    tab: 'customer',
    key_title: 'GENERAL.TRANSACTION_NO_FEEDBACK'
}], [{
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    key_title: 'GENERAL.FEEDBACK_VERY_GOOD'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    key_title: 'GENERAL.FEEDBACK_GOOD'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    key_title: 'GENERAL.FEEDBACK_MEDIUM'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    key_title: 'GENERAL.FEEDBACK_BAD'
}]];


import { RxTab } from '../tab/tab.module';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxItems = new BehaviorSubject<MyItem[]>([]);
export const RxItemPie = new BehaviorSubject<MyItem[][]>([]);
export const RxW = new BehaviorSubject<number>(0);


import {combineLatest} from 'rxjs/observable/combineLatest';


const I18n = SharedService.I18n;
combineLatest(I18n.RxTranslations, RxTab).subscribe(arr => {
    const [translations, t] = arr;
    const fields = Fields.filter(v => v.tab === t);
    fields.forEach(f => f.title = I18n.Translate(translations, f.key_title));
    RxItems.next(fields);
    let data: MyItem[][] = [];
    FieldPie.forEach(v => {
        let field = v.filter(s => s.tab === t);
        field.forEach(f => f.title = I18n.Translate(translations, f.key_title));
        if (field.length > 0) {
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
        let data: MyItem[] = [];
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

import { IAggregate, AggregateView, RxSummaryView, RxAggregate, MakeIndexBy } from '../../service/aggregate.service';
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
