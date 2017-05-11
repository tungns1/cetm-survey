import { ProjectConfig } from '../../shared';
import { ITicket, Ticket } from './ticket';
const TICKET_PRIORITY = ProjectConfig.TICKET_PRIORITY;

export function getPriority(t: ITicket) {
    var priority = 0;
    const data = t.ticket_priority || {};
    Object.keys(data).forEach(name => {
        if (data[name]) {
            priority += +(TICKET_PRIORITY[name]) || 0;
        }
    });
    return priority;
}

export interface ITicketPriority {
    ticket_serving_move: number;
    service_priority: string;
    customer_priority: string;
    vip_card: string;
    customer_vip: string;
    ticket_online: string;
}

export function sortTicket(a: Ticket, b: Ticket) {
    if (a.priority > b.priority) {
        return -1;
    } else if (a.priority < b.priority) {
        return 1;
    }
    return a.ctime < b.ctime ? -1 : 1;
}

export function priorityCode(p: ITicketPriority) {
    if (p.customer_priority) {
        return "customer";
    } 
    if (p.customer_vip) {
        return "vip";
    } 
    return "normal";
}

export function isRestricted(priority: number) {
    return false;
}