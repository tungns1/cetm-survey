import { ISummary, Summary, ITicket } from '../../model/';

export interface IAppState {
    summary: Summary[];
    waiting: ITicket[];
    served: ITicket[];
    focus: Summary;
}

export const ACTION = {
    REFRESH_SUMMARY: "REFRESH_SUMMARY",
    UPDATE_SUMMARY: "UPDATE_SUMMARY",
    REFRESH_TICKET: "REFRESH_TICKET",
    UPDATE_TICKET: "UPDATE_TICKET",
    FOCUS_BRANCH: "FOCUS_BRANCH"
}

import { Action, ActionReducer } from '@ngrx/store';

function AddToSet<T>(arr: T[], a: T, checker: (old: T) => boolean) {
    const i = arr.findIndex(checker);
    const v = [].concat(arr);
    if (i < 0) {
        v.push(a);
    } else {
        v[i] = a;
    }
    return v;
}

export function SummaryReducer(state: Summary[] = [], action: Action) {
    switch (action.type) {
        case ACTION.REFRESH_SUMMARY:
            return (action.payload || []).map(s => new Summary(s));
        case ACTION.UPDATE_SUMMARY:
            const s = new Summary(action.payload);
            return AddToSet([].concat(state), s, (old) => old.branch_id === s.branch_id);
        default:
            return state;
    }
}

import { Model } from '../../shared';
const TicketStates = Model.House.TicketStates;

export function WaitingReducer(state: ITicket[] = [], action: Action) {
    switch (action.type) {
        case ACTION.REFRESH_TICKET:
            let tickets: ITicket[] = action.payload;
            return tickets.filter(t => t.state === TicketStates.Waiting);
        case ACTION.UPDATE_TICKET:
            let t: ITicket = action.payload;
            return AddToSet(state, t, old => t.id === old.id);
        default:
            return state;

    }
}

function addServingTrack(t: ITicket) {
    t.serving = t.tracks.find(
        track => track.state === TicketStates.Serving
    ) || <Model.House.ITicketTrack>{
        state: TicketStates.Serving,
    };
    return t;
}

export function ServedTicketReducer(state: ITicket[] = [], action: Action) {
    switch (action.type) {
        case ACTION.REFRESH_TICKET:
            let tickets: ITicket[] = action.payload;
            return tickets.map(addServingTrack);
        case ACTION.UPDATE_TICKET:
            let t: ITicket = action.payload;
            addServingTrack(t);
            return AddToSet(state, t, old => t.id === old.id);
        default:
            return state;
    }
}

export function FocusSummaryReducer(state: Summary = new Summary(), action: Action) {
    switch (action.type) {
        case ACTION.REFRESH_TICKET:
            state.Clear();
            state.AddTickets(action.payload);
            return state;
        case ACTION.UPDATE_TICKET:
            state.AddTickets([].concat(action.payload));
            return state;
        case ACTION.FOCUS_BRANCH:
            state.setBranchID(action.payload);
            return state;
        default:
            return state;
    }
}

export const Reducers = {
    summary: SummaryReducer,
    waiting: WaitingReducer,
    served: ServedTicketReducer,
    focus: FocusSummaryReducer,
}
