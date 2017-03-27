
import { Item } from '../../../../x/ng/d3/';

export interface ChartItem extends Item {
    header?: string;
    title?: string;
    key_title: string;
}

export const PieItems: ChartItem[][] = 
[
    [
        {
            header: 'Ticket detail',
            field: 'finished',
            color: '#65c553',
            key_title: 'Finished transaction'
        }, 
        {
            field: 'cancelled',
            color: '#6f6f6f',
            key_title: 'Cancelled transaction'
        }, 
        {
            field: 'waiting',
            color: '#fcff47',
            key_title: 'Waiting transaction'
        }, 
        {
            field: 'missed',
            color: '#fb6868',
            key_title: 'Missed transaction'
        }, 
        {
            field: 'serving',
            color: '#64a2ff',
            key_title: 'Serving transaction'
        }
    ],
    [
        {
            header: 'Exceeded waiting time transaction',
            field: 'waiting',
            color: '#65c553',
            key_title: 'Finished transaction'
        }, 
        {
            field: 'wait_long',
            color: '#fcff47',
            key_title: 'Cancelled transaction'
        }
    ],
    [
        {
            header: 'Ticket serve lessv 2 minute\'',
            field: 'finished',
            color: '#65c553',
            key_title: 'Finished transaction'
        }, {
            field: 'serve_short',
            color: '#fcff47',
            key_title: 'Cancelled transaction'
        }
    ]
];


