import { ProjectConfig } from '../../shared';
import { ITicket, Ticket } from './ticket';
const TICKET_PRIORITY = ProjectConfig.TICKET_PRIORITY;

function getPriority(data: ITicketPriority) {
    if (!data) return 0;
    var priority = 0;
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


function priorityCode(p: ITicketPriority) {
    if (p) {
        if (p.customer_priority) {
            return "customer";
        }
        if (p.customer_vip) {
            return "vip";
        }
    }
    return "normal";
}

export class TicketPriority {
    constructor(private _t: ITicketPriority) { }
    value = getPriority(this._t);
    code = priorityCode(this._t);
    isRestricted() {
        return false;
    }
}