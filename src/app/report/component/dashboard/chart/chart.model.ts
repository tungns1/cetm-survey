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
    key_title: 'Total Transaction'
}, {
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    key_title: 'Finished Transaction'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    key_title: 'Cancelled Transaction'
}, {
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    key_title: 'Waiting time',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    key_title: 'Serving time'
}, {
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    key_title: 'Very Good Feedback'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    key_title: 'Good Feedback'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    key_title: 'Average Feedback'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    key_title: 'Poor Feedback'
}];

export const PieItems: ChartItem[][] = [[{
    field: 'c_ft',
    color: '#99b3ff',
    tab: 'general',
    key_title: 'Finished Transaction'
}, {
    field: 'c_ct',
    color: '#969c9c',
    tab: 'general',
    key_title: 'Cancelled Transaction'
}], [{
    field: 'c_bwt',
    color: '#339933',
    tab: 'general',
    key_title: 'Standard wait transaction'
}, {
    field: 'c_awt',
    color: '#b4e4b4',
    tab: 'general',
    key_title: 'Exceeded waiting time transaction'
}], [{
    field: 'c_bst',
    color: '#339966',
    tab: 'general',
    key_title: 'Standard serving time transaction'
}, {
    field: 'c_ast',
    color: '#9fdfbf',
    tab: 'general',
    key_title: 'Exceeded serving time transaction'
}], [{
    field: 's_wt_h',
    tab: 'time',
    color: 'steelblue',
    key_title: 'Waiting time',
    axis: 'left'
}, {
    field: 's_st_h',
    tab: 'time',
    color: 'green',
    key_title: 'Serving time'
}], [{
    field: 'c_r',
    color: '#99b3ff',
    tab: 'customer',
    key_title: 'Transaction Feedback'
}, {
    field: 'c_r_o',
    color: '#969c9c',
    tab: 'customer',
    key_title: 'Transaction without feedback'
}], [{
    field: 'c_r_a',
    tab: 'customer',
    color: '#0088cc',
    key_title: 'Very Good Feedback'
}, {
    field: 'c_r_b',
    tab: 'customer',
    color: '#73e600',
    key_title: 'Good Feedback'
}, {
    field: 'c_r_c',
    tab: 'customer',
    color: '#ffcc00',
    key_title: 'Average Feedback'
}, {
    field: 'c_r_d',
    tab: 'customer',
    color: '#ff3333',
    key_title: 'Poor Feedback'
}]];


