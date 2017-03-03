import { SharedService } from '../../shared';

import { Item } from '../../../../x/ng/d3/chart';

export interface ChartItem extends Item {
    title?: string;
    key_title: string;
}

export const PieItems: ChartItem[][] = 
[
    [
        {
            field: 'finished',
            color: '#65c553',
            key_title: 'GENERAL.TRANSACTION_FINISH'
        }, 
        {
            field: 'cancelled',
            color: '#6f6f6f',
            key_title: 'GENERAL.TRANSACTION_CANCEL'
        }, 
        {
            field: 'waiting',
            color: '#fcff47',
            key_title: 'GENERAL.TRANSACTION_WAITING'
        }, 
        {
            field: 'missed',
            color: '#fb6868',
            key_title: 'GENERAL.TRANSACTION_MISSED'
        }, 
        {
            field: 'serving',
            color: '#64a2ff',
            key_title: 'GENERAL.TRANSACTION_SERVING'
        }
    ],
    [
        {
            field: 'waiting',
            color: '#65c553',
            key_title: 'GENERAL.TRANSACTION_FINISH'
        }, 
        {
            field: 'wait_long',
            color: '#fcff47',
            key_title: 'GENERAL.TRANSACTION_CANCEL'
        }
    ],
    [
        {
            field: 'finished',
            color: '#65c553',
            key_title: 'GENERAL.TRANSACTION_FINISH'
        }, {
            field: 'serve_short',
            color: '#fcff47',
            key_title: 'GENERAL.TRANSACTION_CANCEL'
        }
    ]
];


