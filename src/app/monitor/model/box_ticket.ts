import { ActivityCategory } from './activity_category';
import { IActivitySummary, ActivitySummary } from './activity_summary';
import {
    ICounter, IBranch, IService, IUser,
    IMapTicket, ITicket, TicketStates
} from '../shared';
import { IBoxTicketSummary, BoxTicketSummary } from './ticket_summary';
import { TicketGroup, UserGroup } from './shared';

export interface IBoxTicket {
    branch_id: string;
    branch: IBranch;
    parent: IBranch;
    counters: ICounter[];
    users: IUser[];
    tickets: IMapTicket;
    services: IService[];
    counter_activity: IActivitySummary;
    summary: IBoxTicketSummary;
}

export class BoxTicket {
    constructor(private _b: IBoxTicket) { }
    branch_id = this._b.branch_id;
    branch = this._b.branch;
    parent = this._b.parent;
    counter = new ActivitySummary(this._b.counter_activity);
    users = new UserGroup(this._b.users);
    tickets = new TicketGroup(this._b.tickets);
    services = this._b.services;
    summary = new BoxTicketSummary(this._b.summary);

    UpdateActivitySummary(s: IActivitySummary) {
        if (!s) return;
        const _s = new ActivitySummary(s);
        if (_s.category == this.counter.category) {
            this.counter = _s;
        }
    }

}