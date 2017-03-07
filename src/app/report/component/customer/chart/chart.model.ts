import { SharedService } from '../../shared';

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
        tab: 'general',
        key_title: 'LANGAUGE_TRANSACTION_WAIT_STANDARD'
    }, {
        field: 's_wt',
        color: '#b4e4b4',
        tab: 'general',
        key_title: 'LANGAUGE_TRANSACTION_WAIT_BEYOND_STANDARD'
    }], [{
        field: 'c_bst',
        color: '#339966',
        tab: 'general',
        key_title: 'LANGAUGE_TRANSACTION_SERVING_STANDARD'
    }, {
        field: 'c_st',
        color: '#9fdfbf',
        tab: 'general',
        key_title: 'LANGAUGE_TRANSACTION_SERVING_BEYOND_STANDARD'
    }]
];
