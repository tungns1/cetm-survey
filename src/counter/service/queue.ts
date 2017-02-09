import { Model } from '../shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RxCurrentCounter } from './model';

export type ITicket = Model.House.ITicket;

class Queue {
    constructor(private state: string) {

    }

    RxData = new BehaviorSubject<Model.House.ITicket[]>([]);

    static sort(a: ITicket, b: ITicket) {
        if (a.priority > b.priority) {
            return -1;
        } else if (a.priority < b.priority) {
            return 1;
        }
        return a.mtime < b.mtime ? -1 : 1;
    }

    Init(tickets: ITicketMap) {
        if (!tickets) {
            return;
        }

        const queue = Object.keys(tickets).map(id => tickets[id]);
        queue.sort(Queue.sort);
        this.RxData.next(queue);
    }

    Remove(id: string) {
        const queue = this.RxData.value;
        for (let i = 0; i < queue.length; i++) {
            if (id === queue[i].id) {
                queue.splice(i, 1);
                this.RxData.next(queue);
                break;
            }
        }
    }

    Add(t: ITicket) {
        const queue = this.RxData.value;
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].id === t.id) {
                queue.splice(i, 1);
                break;
            }
        }
        let pos = queue.length - 1;
        while (pos >= 0) {
            const v = queue[pos];
            // priority first
            if (v.priority === t.priority) {
                // older
                if (v.mtime < t.mtime) {
                    break;
                }
            }
            if (v.priority > t.priority) {
                break;
            }
            pos--;
        }
        queue.splice(pos + 1, 0, t);
        this.RxData.next(queue);
    }

    first() {
        return this.RxData.value[0];
    }

    count() {
        return this.RxData.map(v => v.length);
    }

}

const TicketStates = Model.House.TicketStates;
export const Waiting = new Queue(TicketStates.Waiting)
export const Serving = new Queue(TicketStates.Serving);
export const Missed = new Queue(TicketStates.Missed);

interface ITicketMap { [index: string]: Model.House.ITicket }

export function Init(queues: { waiting: ITicketMap, serving: ITicketMap, missed: ITicketMap }) {
    Waiting.Init(queues.waiting);
    Serving.Init(queues.serving);
    Missed.Init(queues.missed);
}

export function AddTicket(t: ITicket) {
    var currentQueue = GetQueue(t.state);
    if (currentQueue) {
        currentQueue.Add(t)
    }
}

export function RemoveTicket(prev: Model.House.TicketState, id: string) {
    var prevQueue = GetQueue(prev);
    if (prevQueue) {
        prevQueue.Remove(id);
    }
}

function GetQueue(state: Model.House.TicketState) {
    switch (state) {
        case TicketStates.Waiting:
            return Waiting;
        case TicketStates.Serving:
            return Serving;
        case TicketStates.Missed:
            return Missed;
        default:
            return null;
    }
}

export const RxBusy = Serving.RxData.map(v => v.length > 0);
export const autoNext = new BehaviorSubject<boolean>(false);
export const feedbackDone = new BehaviorSubject<boolean>(true);
export const ticketDialog = new BehaviorSubject<boolean>(true);
export const RxWaiting = Waiting.RxData.map(v => v.length > 0);