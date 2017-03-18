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
        key_title: 'LANGAUGE_TRANSACTION_WAIT_STANDARD'
    }, {
        field: 's_wt',
        color: '#b4e4b4',
        key_title: 'LANGAUGE_TRANSACTION_WAIT_BEYOND_STANDARD'
    }], [{
        field: 'c_bst',
        color: '#339966',
        key_title: 'LANGAUGE_TRANSACTION_SERVING_STANDARD'
    }, {
        field: 's_st',
        color: '#9fdfbf',
        key_title: 'LANGAUGE_TRANSACTION_SERVING_BEYOND_STANDARD'
    }]
];


export const FresItems: ChartItem[] = [
    {
        field: 'count',
        color: '#339933',
        key_title: 'LANGAUGE_TRANSACTION_FRES'
    }
];