import {
    ITicket
} from '../shared';
import { TICKET_PRIORITY } from "../../../../../const/ticket";

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
            priority += parseInt(TICKET_PRIORITY.CUSTOMER_VIP);
        } else if (t.ticket_priority.service_priority != "") {
            priority += parseInt(TICKET_PRIORITY.SERVICE_PRIORITY);
        } else if (t.ticket_priority.customer_priority != "") {
            priority += parseInt(TICKET_PRIORITY.CUSTOMER_PRIORITY);
        } else if (t.ticket_priority.ticket_online != "") {
            priority += parseInt(TICKET_PRIORITY.TICKET_ONLINE);
        } else if (t.ticket_priority.vip_card != "") {
            priority += parseInt(TICKET_PRIORITY.VIP_CARD);
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