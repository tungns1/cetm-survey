import {
    ITicket
} from '../shared';
import { LOCALES_TICKET } from "../../../../../const/ticket";

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
            priority += parseInt(LOCALES_TICKET.CUSTOMER_PRIORITY);
        } else if (t.ticket_priority.service_priority != "") {
            priority += parseInt(LOCALES_TICKET.SERVICE_PRIORITY);
        } else if (t.ticket_priority.customer_priority != "") {
            priority += parseInt(LOCALES_TICKET.CUSTOMER_PRIORITY);
        } else if (t.ticket_priority.ticket_online != "") {
            priority += parseInt(LOCALES_TICKET.TICKET_ONLINE);
        } else if (t.ticket_priority.vip_card != "") {
            priority += parseInt(LOCALES_TICKET.VIP_CARD);
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