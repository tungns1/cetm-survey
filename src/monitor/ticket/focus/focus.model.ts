import { Model } from '../../shared';
import { socket } from '../backend';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Summary } from '../backend';

export interface ITicket extends Model.House.ITicket {
    serving: Model.House.ITicketTrack;
}

export const RxCalledTickets = new BehaviorSubject<ITicket[]>([]);
export const RxWaitingTickets = new BehaviorSubject<ITicket[]>([]);

interface ITickets {
    [index: string]: ITicket;
}

const Waiting = new Map<string, ITicket>();
const Called = new Map<string, ITicket>();
const summary = new Summary();
export const RxSummary = new BehaviorSubject<Summary>(summary);

const TicketStates = Model.House.TicketStates;
const servingTrack = <Model.House.ITicketTrack>{
    state: TicketStates.Serving,
};

function addTicket(t: ITicket) {
    if (t.state == TicketStates.Waiting) {
        Waiting.set(t.id, t);
    } else {
        t.serving = t.tracks.find(
            track => track.state === TicketStates.Serving
        ) || servingTrack;
        
        Called.set(t.id, t);
    }
}

function init(tickets: ITickets) {
    Waiting.clear();
    Called.clear();
    Object.keys(tickets).forEach(id => {
        addTicket(tickets[id]);
    });
    setTimeout(refresh, 250);
}


function refresh() {
    RxWaitingTickets.next(Array.from(Waiting.values()));
    RxCalledTickets.next(Array.from(Called.values()));
    summary.Clear();
    summary.AddTickets(RxWaitingTickets.value);
    summary.AddTickets(RxCalledTickets.value);
    RxSummary.next(summary);
}

export function SetBranchID(branch_id: string) {
    summary.setBranchID(branch_id);
    RxSummary.next(summary);
}

socket.Subscribe<ITicket>("/ticket", t => {
    addTicket(t);
    refresh();
});
socket.Subscribe<ITickets>("/tickets", init);
