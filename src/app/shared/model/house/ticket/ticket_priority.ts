import { ProjectConfig } from '../../shared';
import { ITicket, Ticket } from './ticket';
const PriorityConfig = ProjectConfig.priority;

function getPriority(data: ITicketPriority) {
    if (!data) return 0;
    var priority = 0;
    if (data.internal_vip_card) {
        priority += PriorityConfig.internal_vip_card;
    }
    if (data.customer_vip_card) {
        priority += PriorityConfig.customer_vip_card;
    }
    if (data.privileged_customer) {
        priority += PriorityConfig.privileged_customer;
    }
    if (data.service_priority) {
        priority += +data.service_priority || 0;
    }
    if (data.booked_ticket) {
        priority += PriorityConfig.booked_ticket;
    }
    if (data.moved_ticket) {
        priority += PriorityConfig.moved_ticket;
    }
    if (data.restore_ticket) {
        priority += PriorityConfig.restore_ticket;
    }
    return priority;
}

export interface ITicketPriority {
    service_priority: string;
    privileged_customer: string;
    internal_vip_card: string;
    customer_vip_card: string;
    booked_ticket: string;
    moved_ticket: number;
    restore_ticket: number;
}

function priorityCode(p: ITicketPriority) {
    if (p) {
        if (p.privileged_customer) {
            return "privileged";
        }
        if (p.customer_vip_card) {
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
        const step = this.value - b.value;
        if (step < -PriorityConfig.priority_step) {
            return 1;
        } else if (step > PriorityConfig.priority_step) {
            return -1;
        };
        return 0;
    }
    
    detail() {
        const obj = this._t;
        return Object.keys(obj).filter(k => obj[k]).join(";");
    }
}