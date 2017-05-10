import { ITicket } from './shared';


export interface ITicketAction {
    action: string;
    ticket_id: string;
    branch_id: string;
    ticket?: ITicket;
    service_id?: string;
    state?: string;
    extra?: any;
}

const ActionMiss = "miss";
const ActionCancel = "cancel";
const ActionCall = "call";
const ActionRecall = "recall";
const ActionFinish = "finish";
const ActionMove = "move";

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

}