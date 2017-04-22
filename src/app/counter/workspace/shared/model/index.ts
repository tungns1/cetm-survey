import {
    ITicket
} from '../shared';

export * from './stat';

export interface ITickets {
    [index: string]: ITicket;
}

export function SortTicket(a: ITicket, b: ITicket) {

    if (getPriority(a) > getPriority(b)) {
        return -1;
    } else if (getPriority(a) < getPriority(b)) {
        return 1;
    }
    return a.mtime < b.mtime ? -1 : 1;
}

function getPriority(t: ITicket) {
    var priority = 0;
    if (t.ticket_priority != undefined) {
        if (t.ticket_priority.customer_vip != "") {
            priority += parseInt(t.ticket_priority.customer_vip);
        } else if (t.ticket_priority.service_priority != "") {
            priority += parseInt(t.ticket_priority.service_priority);
        } else if (t.ticket_priority.customer_priority != "") {
            priority += parseInt(t.ticket_priority.customer_priority);
        } else if (t.ticket_priority.ticket_online != "") {
            priority += parseInt(t.ticket_priority.ticket_online);
        } else if (t.ticket_priority.vip_card != "") {
            priority += parseInt(t.ticket_priority.vip_card);
        } else if (t.ticket_priority.ticket_serving_move != null) {
            priority += t.ticket_priority.ticket_serving_move;
        }
        return priority;
    }
}


export interface ITicketQueue {
    waiting: ITickets,
    serving: ITickets,
    missed: ITickets
}