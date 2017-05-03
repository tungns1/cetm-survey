import { ICustomer } from '../../org';
import { TicketState, TicketStates } from './ticket_state';
import { getPriority, ITicketPriority } from './ticket_priority';
import { IFeedback } from './ticket_feedback';

export interface ITicketTrack {
    state: TicketState;
    mtime: number;
    // stime: number;
    services?: string[];
    user_id?: string;
    counter_id?: string;
    service_id?: string;
    feedback: IFeedback;
}

export interface ITicket {
    id: string;
    cnum: string;
    branch_id: string;
    service_id: string;
    counter_id: string;
    services: string[];
    counters: string[];
    ccount: number;
    vcode: string;
    priority: number;
    user_id: string;
    state: TicketState;
    lang?: string;
    ctime: number;
    mtime: number;
    stime: number;
    tracks: ITicketTrack[];
    customer: ICustomer;
    ticket_priority: ITicketPriority;
    transaction_id?: string;
}

export interface IMapTicket {
    [index: string]: ITicket;
}

export function TicketPrevState(t: ITicket) {
    const tracks = t.tracks;
    if (!Array.isArray(tracks) || tracks.length < 2) {
        return TicketStates.Unknown;
    }
    const track = tracks[tracks.length - 2];
    return track.state || TicketStates.Unknown;
}

import { ServiceName } from '../../center';


function getServiceName(t: ITicket) {
    switch (t.state) {
        case TicketStates.Waiting:
        // fallthrough
        case TicketStates.Missed:
            return t.services.map(ServiceName).join(",");
        case TicketStates.Serving:
            return ServiceName(t.service_id);
        default:
            return "";
    }
}

export class Ticket {
    constructor(private _t: ITicket) { }
    id = this._t.id
    cnum = this._t.cnum
    branch_id = this._t.branch_id;
    service_id = this._t.service_id;
    counter_id = this._t.counter_id;
    services = this._t.services || [];
    counters = this._t.counter_id || [];
    ccount = this._t.ccount || 0;
    user_id = this._t.user_id;
    state = this._t.state;
    lang?= this._t.lang;
    ctime = this._t.ctime;
    mtime = this._t.mtime;
    tracks = this._t.tracks;
    customer = this._t.customer;
    ticket_priority = this._t.ticket_priority;
    transaction_id?= this._t.transaction_id;
    service_name = getServiceName(this._t);
    priority = getPriority(this._t);
}