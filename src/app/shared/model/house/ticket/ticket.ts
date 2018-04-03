import { ICustomer, Customer } from '../../org';
import { IService } from '../../center';
import { ICounter } from '../counter';
import { TicketState, TicketStates } from './ticket_state';
import { ITicketPriority, TicketPriority } from './ticket_priority';
import { IFeedback } from './ticket_feedback';

export interface ITicketTrack {
    state: TicketState;
    mtime: number;
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
    ticket_booking?: ITicketBooking;
}

interface ITicketBooking {
    id: string;
    created_at: number;
    updated_at: number;
    time_go_bank: number;
    service_id: string;
    branch_id: string;
    type_ticket: string;
    lang: string;
    customer_code: string;
    customer_id: string;
    check_in_at: number;
    id_ticket_cetm: string;
    cnum_cetm: string;
    teller_id: string;
    teller: string;
    serving_time: string;
    wating_time: string;
    status: string;
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
            if (t.services)
                return t.services.map(ServiceName).join(",");
        case TicketStates.Serving:
            return ServiceName(t.service_id);
        default:
            return ServiceName(t.service_id);
    }
}

export class Ticket {
    constructor(private _t: ITicket) { }
    id = this._t.id
    cnum = this._t.cnum
    branch_id = this._t.branch_id;
    service_id = this._t.service_id;
    counter_id = this._t.counter_id;
    services: string[] = this._t.services || [];
    counters: string[] = this._t.counters || [];
    ccount = this._t.ccount || 0;
    user_id = this._t.user_id;
    state = this._t.state;
    lang?= this._t.lang;
    ctime = this._t.ctime;
    mtime = this._t.mtime;
    tracks = this._t.tracks;
    customer = new Customer(this._t.customer);
    ticket_priority = this._t.ticket_priority;
    transaction_id?= this._t.transaction_id;
    service_name = getServiceName(this._t);
    priority = new TicketPriority(this._t.ticket_priority);
    ticket_booking: ITicketBooking = this._t.ticket_booking || null;

    getPrevTrack() {
        return this.tracks[this.tracks.length - 2];
    }

    getLastTrack() {
        return this.tracks[this.tracks.length - 1];
    }

    addHelperFields() {
        if (this.state == TicketStates.Serving) return;
        const prevTrack = this.getPrevTrack();
        if (!prevTrack) return;

        if (this.state == TicketStates.Finished) {
            this.service_id = prevTrack.service_id;
            this.counter_id = prevTrack.counter_id;
            this.user_id = prevTrack.user_id;
            this.__stime = this.mtime - prevTrack.mtime;
            return;
        }

        for (let i = this.tracks.length - 1; i >= 0; i--) {
            const track = this.tracks[i];
            this.counter_id = this.counter_id || track.counter_id;
            this.user_id = this.user_id || track.counter_id;
            this.service_id = track.service_id;
            if (this.service_id) {
                break;
            }
        }
    }

    isDone() {
        return this.state == TicketStates.Finished || this.state == TicketStates.Cancelled || this.state == TicketStates.Waiting;
    }

    __stime = 0; // serving time

    static sort(a: Ticket, b: Ticket) {
        // -1, 0, 1
        var step = a.priority.compare(b.priority);
        if (step === 0) {
            return a.mtime < b.mtime ? -1 : 1;
        }
        return step;
    }

    IsState(state: TicketState) {
        return this.state == state;
    }
}