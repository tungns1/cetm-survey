export interface ISummary {
    branch_id: string;
    waiting: number;
    serving: number;
    missed: number;
    cancelled: number;
    finished: number;
}

import { Branch, Model } from '../../shared';
const TicketStates = Model.House.TicketStates;

export class Summary {
    branch: string;
    branch_id: string;
    waiting: number;
    serving: number;
    missed: number;
    cancelled: number;
    finished: number;
    printed: number;
    constructor(private data?: ISummary) {
        if (!data) {
            return;
        }
        this.waiting = +data.waiting || 0;
        this.serving = +data.serving || 0;
        this.missed = +data.missed || 0;
        this.cancelled = +data.cancelled || 0;
        this.finished = +data.finished || 0;
        this.setBranchID(data.branch_id);
        this.fix();
    }

    setBranchID(branch_id: string) {
        this.branch_id = branch_id;
        const b = Model.Org.CacheBranch.GetByID(this.branch_id);
        this.branch = b ? b.name : 'n/a';
    }

    private fix() {
        this.printed = this.waiting + this.serving + this.missed + this.finished + this.cancelled;
    }

    Clear() {
        this.waiting = 0;
        this.serving = 0;
        this.missed = 0;
        this.cancelled = 0;
        this.finished = 0;
    }

    private addTicket(t: Model.House.ITicket) {
        switch (t.state) {
            case TicketStates.Waiting:
                this.waiting++;
                break;
            case TicketStates.Serving:
                this.serving++;
                break;
            case TicketStates.Finished:
                this.finished++;
                break;
            case TicketStates.Cancelled:
                this.cancelled++;
                break;
            case TicketStates.Missed:
                this.missed++;
                break;
        }
    }

    AddTickets(tickets: Model.House.ITicket[]) {
        tickets.forEach(t => this.addTicket(t));
        this.fix();
    }

}

