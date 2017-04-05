import {ICustomer} from '../org/customer'
export interface ITicket {
    id: string;
    cnum: string;
    branch_id:string;
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
    customer:ICustomer;
    ticket_priority:ITicketPriority;
}

export interface ITicketPriority{
    service_priority:string;
    vip_card:string;
    customer_vip:string;
    ticket_online:string;
}



export type TicketState = "waiting" | "serving" | "missed" | "cancelled" | "finished" | "unknown";


const TicketStateWaiting: TicketState = "waiting";
const TicketStateServing: TicketState = "serving";
const TicketStateMissed: TicketState = "missed";
const TicketStateFinished: TicketState = "finished";
const TicketStateCancelled: TicketState = "cancelled";
const TicketStateUnknown: TicketState = "unknown";

export const TicketStates = {
    Waiting: TicketStateWaiting,
    Serving: TicketStateServing,
    Missed: TicketStateMissed,
    Finished: TicketStateFinished,
    Cancelled: TicketStateCancelled,
}

export interface IFeedback {
    rating: number;
}

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

export function TicketPrevState(t: ITicket) {
    const tracks = t.tracks;
    if (!Array.isArray(tracks) || tracks.length < 2) {
        return TicketStateUnknown;
    }
    const track = tracks[tracks.length - 2];
    return track.state || TicketStateUnknown;
}