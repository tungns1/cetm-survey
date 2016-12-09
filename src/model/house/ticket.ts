export interface ITicket {
    id: string;
    cnum: string;
    service_id: string;
    counter_id: string;
    services: string[];
    counters: string[];
    ccount: number;
    vcode: string;
    priority: number;
    user_id: string;
    state: string;
    lang?: string;
    ctime: number;
    mtime: number;
}



export type TicketState = "waiting" | "serving" | "missed" | "cancelled" | "finished";


export const TicketStateWaiting: TicketState = "waiting";
export const TicketStateServing: TicketState = "serving";
export const TicketStateMissed: TicketState = "missed";
export const TicketStateFinished: TicketState = "finished";
export const TicketStateCancelled: TicketState = "cancelled";

import { Locale } from '../../config/';

export function TicketStateName() {
    let locale = Locale();
}
