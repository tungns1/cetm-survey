import { ITicket, Ticket } from './shared';


export interface ITicketAction {
    action: string;
    ticket_id: string;
    branch_id: string;
    ticket?: ITicket;
    service_id?: string;
    state?: string;
    extra?: any;
    counter_id?: string;
    // history?: any;
}

export const ActionMiss = "miss";
export const ActionCancel = "cancel";
export const ActionCall = "call";
export const ActionRecall = "recall";
export const ActionFinish = "finish";
export const ActionMove = "move";
export const ActionCreate = "create";
export const ActionRestore = "restore";

export class TicketAction {
    constructor(
        private _a: ITicketAction
    ) {
        
    }

    state = this._a.state;
    ticket_id = this._a.ticket_id;
    service_id = this._a.service_id;
    extra = this._a.extra;
    action = this._a.action;
    ticket = new Ticket(this._a.ticket);

    IsCreate() {
        return this.action == ActionCreate;
    }

    IsMissed() {
        return this.action == ActionMiss;
    }
    IsRestore() {
        return this.action == ActionRestore;
    }

    IsServing() {
        return this.action == ActionCall || this.state == ActionRecall;
    }

}