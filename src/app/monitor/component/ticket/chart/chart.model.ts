
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
            color: '#fcff4d',
            key_title: 'Finished transaction'
        }, 
        {
            field: 'cancelled',
            color: '#8dbb00',
            key_title: 'Cancelled transaction'
        }, 
        {
            field: 'waiting',
            color: '#4df7ff',
            key_title: 'Waiting transaction'
        }, 
        {
            field: 'missed',
            color: '#584dff',
            key_title: 'Missed transaction'
        }, 
        {
            field: 'serving',
            color: '#ff4dfa',
            key_title: 'Serving transaction'
        }
    ],
    [
        {
            header: 'Standard waiting time transaction',
            field: 'wait_standard',
            color: '#ff4d4d',
            key_title: 'Standard waiting time transaction'
        }, 
        {
            field: 'wait_long',
            color: '#3eca83',
            key_title: 'Exceeded waiting time transaction'
        }
    ],
    [
        {
            header: 'Exceeded serving time transaction',
            field: 's_standard',
            color: '#ff974d',
            key_title: 'Standard serving time transaction'
        }, {
            field: 's_l',
            color: '#a44adc',
            key_title: 'Exceeded serving time transaction'
        }
    ]
];


