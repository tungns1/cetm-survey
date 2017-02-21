import { Model, Backend } from '../shared';

export type ITicket = Model.House.ITicket;
export type TicketState = Model.House.TicketState;
export const TicketStates = Model.House.TicketStates;

export type ICounter = Model.House.ICounter;

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