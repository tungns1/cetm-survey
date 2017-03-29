
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
            header: 'Exceeded waiting time transaction',
            field: 'wait_standard',
            color: '#ff4d4d',
            key_title: 'Finished transaction'
        }, 
        {
            field: 'wait_long',
            color: '#3eca83',
            key_title: 'Cancelled transaction'
        }
    ]
    // ,
    // [
    //     {
    //         header: 'Ticket serve lessv 2 minute\'',
    //         field: 'finished',
    //         color: '#ff974d',
    //         key_title: 'Finished transaction'
    //     }, {
    //         field: 'serve_short',
    //         color: '#a44adc',
    //         key_title: 'Cancelled transaction'
    //     }
    // ]
];


