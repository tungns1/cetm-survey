import { SharedService } from '../../shared';

import { Item } from '../../../../x/ng/d3/chart';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ChartItem extends Item {
    tab?: string;
    title?: string;
    key_title?: string;
}

export const TimeItems: ChartItem[][] = [[{
    field: 'c_bwt',
    color: '#99b3ff',
    key_title: 'GENERAL.TRANSACTION_HAVE_WAIT_STANDARD'
}, {
    field: 's_wt',
    color: '#969c9c',
    key_title: 'GENERAL.TRANSACTION_HAVE_WAIT_BEYOND_STANDARD'
}], [{
    field: 'c_bst',
    color: 'steelblue',
    key_title: 'GENERAL.TRANSACTION_HAVE_SERVING_STANDARD',
    axis: 'left'
}, {
    field: 's_st',
    color: 'green',
    key_title: 'GENERAL.TRANSACTION_HAVE_SERVING_BEYOND_STANDARD'
}]];
export const FresItems: ChartItem[] = [
    {
        field: 'count',
        color: '#99b3ff',
        key_title: 'GENERAL.TRANSACTION_HAVE_WAIT_STANDARD'
    }
];
// export const FresItems:ChartItem[]=[];
export const ServiceItems : ChartItem[] = [
    {
        field: 'count',
        color: '#99b3ff',
        key_title: 'GENERAL.TRANSACTION_HAVE_WAIT_STANDARD'
    }
];
export const StoreItems : ChartItem[] = [
    {
        field: 'count',
        color: '#99b3ff',
        key_title: 'GENERAL.TRANSACTION_HAVE_WAIT_STANDARD'
    }
];
