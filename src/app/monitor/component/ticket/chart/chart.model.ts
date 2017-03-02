import { SharedService } from '../../shared';

import { Item } from '../../../../x/ng/d3/chart';

export interface ChartItem extends Item {
    title?: string;
    key_title: string;
}

export const PieItems: ChartItem[][] = 
[
    [{
        field: 'finished',
        color: '#65c553',
        key_title: 'GENERAL.TRANSACTION_FINISH'
    }, {
        field: 'cancelled',
        color: '#6f6f6f',
        key_title: 'GENERAL.TRANSACTION_CANCEL'
    }, {
        field: 'waiting',
        color: '#fcff47',
        key_title: 'GENERAL.TRANSACTION_WAITING'
    }, {
        field: 'missed',
        color: '#fb6868',
        key_title: 'GENERAL.TRANSACTION_MISSED'
    }, {
        field: 'serving',
        color: '#64a2ff',
        key_title: 'GENERAL.TRANSACTION_SERVING'
    }],
    [{
        field: 'finished',
        color: '#99b3ff',
        key_title: 'GENERAL.TRANSACTION_FINISH'
    }, {
        field: 'cancelled',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_CANCEL'
    }, {
        field: 'waiting',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_WAITING'
    }, {
        field: 'missed',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_MISSED'
    }, {
        field: 'serving',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_SERVING'
    }],
    [{
        field: 'finished',
        color: '#99b3ff',
        key_title: 'GENERAL.TRANSACTION_FINISH'
    }, {
        field: 'cancelled',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_CANCEL'
    }, {
        field: 'waiting',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_WAITING'
    }, {
        field: 'missed',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_MISSED'
    }, {
        field: 'serving',
        color: '#969c9c',
        key_title: 'GENERAL.TRANSACTION_SERVING'
    }]
];


