import { ProjectConfig } from '../../shared';
import { ITicket, Ticket } from './ticket';
const TICKET_PRIORITY = ProjectConfig.TICKET_PRIORITY;

export function getPriority(t: ITicket) {
    var priority = 0;
    const data = t.priority || {};
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
    return a.mtime < b.mtime ? -1 : 1;
}