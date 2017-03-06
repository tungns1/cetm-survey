import { SharedService } from '../../shared';
import { Item } from '../../../../x/ng/d3/chart';

export interface ChartItem extends Item {

    tab: string;
    title?: string;
    key_title: string;
}

export const MainItems: ChartItem[] = [{
    field: 'c_t',
    color: '#9933ff',
    tab: 'general',
    key_title: 'LANGAUGE_TOTAL_TRANSACTION'
}, {
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_FINISH'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_CANCEL'
}, {
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    key_title: 'LANGAUGE_TIME_WAIT',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    key_title: 'LANGAUGE_TIME_SERVING'
}, {
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    key_title: 'LANGAUGE_FEEDBACK_VERY_GOOD'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    key_title: 'LANGAUGE_FEEDBACK_GOOD'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    key_title: 'LANGAUGE_FEEDBACK_MEDIUM'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    key_title: 'LANGAUGE_FEEDBACK_BAD'
}];

export const PieItems: ChartItem[][] = [[{
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_FINISH'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_CANCEL'
}], [{
    field: 'c_bwt',
    color: '#339933',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_WAIT_STANDARD'
}, {
    field: 'c_awt',
    color: '#b4e4b4',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_WAIT_BEYOND_STANDARD'
}], [{
    field: 'c_bst',
    color: '#339966',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_SERVING_STANDARD'
}, {
    field: 'c_ast',
    color: '#9fdfbf',
    tab: 'general',
    key_title: 'LANGAUGE_TRANSACTION_SERVING_BEYOND_STANDARD'
}], [{
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    key_title: 'LANGAUGE_TIME_WAIT',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    key_title: 'LANGAUGE_TIME_SERVING'
}], [{
    field: 'c_r',
    color: '#99b3ff',
    tab: 'customer',
    key_title: 'LANGAUGE_TRANSACTION_FEEDBACK'
}, {
    field: 'c_r_o',
    color: '#969c9c',
    tab: 'customer',
    key_title: 'LANGAUGE_TRANSACTION_NO_FEEDBACK'
}], [{
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    key_title: 'LANGAUGE_FEEDBACK_VERY_GOOD'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    key_title: 'LANGAUGE_FEEDBACK_GOOD'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    key_title: 'LANGAUGE_FEEDBACK_MEDIUM'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    key_title: 'LANGAUGE_FEEDBACK_BAD'
}]];


