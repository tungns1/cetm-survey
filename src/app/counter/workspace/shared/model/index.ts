import {
    ITicket
} from '../shared';

export * from './stat';

export interface ITickets {
    [index: string]: ITicket;
}

export function SortTicket(a: ITicket, b: ITicket) {
    if (a.priority > b.priority) {
        return -1;
    } else if (a.priority < b.priority) {
        return 1;
    }
    return a.mtime < b.mtime ? -1 : 1;
}

export interface ITicketQueue {
    waiting: ITickets,
    serving: ITickets,
    missed: ITickets
}