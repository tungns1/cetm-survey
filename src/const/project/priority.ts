export interface IPriorityConfig {
    internal_vip_card?: number; // vip card
    customer_vip_card?: number; // vip customer
    privileged_customer?: number; // privileged 
    moved_ticket?: number;
    booked_ticket?: number; // booked
    min_priority_restrited?: number;
    min_priority_unordered_call?: number;
    priority_step?: number;
}

export class PriorityConfig {
    constructor(private _c: IPriorityConfig = {}) { }
    get priority_step() {
        return +this._c.priority_step || 0;
    }

    get internal_vip_card() {
        return +this._c.internal_vip_card || 1;
    }

    get customer_vip_card() {
        return +this._c.customer_vip_card || 1;
    }

    get privileged_customer() {
        return +this._c.privileged_customer || 1;
    }

    get booked_ticket() {
        return +this._c.booked_ticket || 1;
    }

    get moved_ticket() {
        return +this._c.moved_ticket || 1;
    }

    get min_priority_unordered_call() {
        return +this._c.min_priority_unordered_call || 1;
    }

    get min_priority_restricted() {
        return +this._c.min_priority_restrited || (1 << 16); // disable
    }

    __update(c: IPriorityConfig) {
        if (!c) return;
        this._c = c;
    }
}