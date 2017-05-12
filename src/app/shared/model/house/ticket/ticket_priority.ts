import { ProjectConfig } from '../../shared';
import { ITicket, Ticket } from './ticket';
const PriorityConfig = ProjectConfig.priority;

function getPriority(data: ITicketPriority) {
    if (!data) return 0;
    var priority = 0;
    if (data.vip_card) {
        priority += PriorityConfig.internal_vip_card;
    }
    if (data.customer_vip) {
        priority += PriorityConfig.customer_vip_card;
    }
    if (data.customer_priority) {
        priority += PriorityConfig.privileged_customer;
    }
    if (data.service_priority) {
        priority += +data.service_priority || 0;
    }
    if (data.ticket_online) {
        priority += PriorityConfig.booked_ticket;
    }
    if (data.ticket_serving_move) {
        priority += PriorityConfig.moved_ticket;
    }
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
        return this.value >= PriorityConfig.min_priority_restricted;
    }
    
    canMakeUnorderedCall() {
        return this.value >= PriorityConfig.min_priority_unordered_call;
    }

    compare(b: TicketPriority) {
        const step = Math.abs(this.value - b.value) 
        return step - PriorityConfig.priority_step;
    }
}