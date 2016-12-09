import { socket } from './socket';
import { Model } from '../shared';

const ActionCallWaiting = "call_from_waiting"
const ActionCallMissed = "call_from_missed"
const ActionCancel = "cancel"
const ActionMiss = "miss"
const ActionRecall = "recall"
const ActionFinish = "finish"
const ActionMove = "move"

interface ITicketAction {
    action: string;
    ticket_id: string;
    counter_id?: string;
    services?: string[];
    counters?: string[];
}

import 'rxjs/add/operator/share';

function sendAction(body: ITicketAction) {
    return socket.Send('/ticket', body).share();
}

export function Remind(t: Model.House.ITicket) {
    return socket.Send('/reminder', {
        ticket_id: t.id
    }).share();
}

export function Recall(t: Model.House.ITicket) {
    return sendAction({
        action: ActionRecall,
        ticket_id: t.id,
    });
}

export function Finish(t: Model.House.ITicket) {
    return sendAction({
        action: ActionFinish,
        ticket_id: t.id,
    });
}

export function Miss(t: Model.House.ITicket) {
    return sendAction({
        action: ActionMiss,
        ticket_id: t.id
    });
}

export function CallFromMissed(t: Model.House.ITicket) {
    return sendAction({
        action: ActionCallMissed,
        ticket_id: t.id
    });
}

export function Cancel(t: Model.House.ITicket) {
    return sendAction({
        action: ActionCancel,
        ticket_id: t.id
    });
}


export function CallFromWaiting(t: Model.House.ITicket) {
    return sendAction({
        action: ActionCallWaiting,
        ticket_id: t.id
    });
}

export function Move(t: Model.House.ITicket, services: string[], counters: string[]) {
    return sendAction({
        action: ActionMove,
        ticket_id: t.id,
        services: services,
        counters: counters,
    });
}

export function Search(cnum: string) {
    return socket.Send<Model.House.ITicket>('/search', {
        cnum: cnum
    });
}

export type ITicket = Model.House.ITicket;
