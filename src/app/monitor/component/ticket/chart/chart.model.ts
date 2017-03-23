
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
            key_title: 'Finished Transaction'
        }, 
        {
            field: 'cancelled',
            color: '#6f6f6f',
            key_title: 'Cancel Transaction'
        }, 
        {
            field: 'waiting',
            color: '#fcff47',
            key_title: 'Waiting transaction'
        }, 
        {
            field: 'missed',
            color: '#fb6868',
            key_title: 'Missed Transaction'
        }, 
        {
            field: 'serving',
            color: '#64a2ff',
            key_title: 'Serving Transaction'
        }
    ],
    [
        {
            header: 'Exceeded waiting time transaction',
            field: 'waiting',
            color: '#65c553',
            key_title: 'Finish Transaction'
        }, 
        {
            field: 'wait_long',
            color: '#fcff47',
            key_title: 'Cancel Transaction'
        }
    ],
    [
        {
            header: 'Ticket serve lessv 2 minute\'',
            field: 'finished',
            color: '#65c553',
            key_title: 'Finish Transaction'
        }, {
            field: 'serve_short',
            color: '#fcff47',
            key_title: 'Cancel Transaction'
        }
    ]
];


