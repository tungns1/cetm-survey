import { Item } from '../../../../x/ng/d3/chart';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ChartItem extends Item {
    tab?: string;
    title?: string;
    key_title?: string;
}


export const TimeItems: ChartItem[][] = [
    [{
        field: 'c_bwt',
        color: '#339933',
        key_title: 'Standard waiting time transaction'
    }, {
        field: 's_wt',
        color: '#b4e4b4',
        key_title: 'Exceeded waiting time transaction'
    }], [{
        field: 'c_bst',
        color: '#339966',
        key_title: 'Standard serving time transaction'
    }, {
        field: 's_st',
        color: '#9fdfbf',
        key_title: 'Exceeded serving time transaction'
    }]
];
