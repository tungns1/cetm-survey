import { Model } from '../shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CurrentCounterID } from './model';

class Queue {
    constructor(private state: string) {

    }

    RxData = new BehaviorSubject<Model.House.ITicket[]>([]);
    private data = new Map<string, Model.House.ITicket>();

    static sort(a: Model.House.ITicket, b: Model.House.ITicket) {
        if (a.priority === b.priority) {
            return a.mtime < b.mtime ? 0 : 1;
        }
        return a.priority > b.priority ? 0 : 1;
    }

    init(data: Model.House.ITicket[]) {
        this.data.clear();
        data.forEach(d => {
            if (d.state === this.state) {
                this.data.set(d.id, d);
            }
        })
        this.refresh();
    }

    update(t: Model.House.ITicket) {
        if (t.state !== this.state) {
            this.data.delete(t.id);
        } else {
            if (t.counters && t.counters.length) {
                let id = CurrentCounterID();
                if (t.counters.indexOf(id) === -1) {
                    this.data.delete(t.id);
                }
            }
            else {
                this.data.set(t.id, t);
            }
        }
        this.refresh();
    }

    private refresh() {
        let arr: Model.House.ITicket[] = Array.from(this.data.values());
        arr.sort(Queue.sort);
        this.RxData.next(arr);
    }

    first() {
        return this.RxData.value[0];
    }

    count() {
        return this.RxData.map(v => v.length);
    }

}


export const Waiting = new Queue(Model.House.TicketStateWaiting)
export const Serving = new Queue(Model.House.TicketStateServing);
export const Missed = new Queue(Model.House.TicketStateMissed);

export function Init(tickets: { [index: string]: Model.House.ITicket }) {
    let v = Object.keys(tickets).map(id => tickets[id]);
    Queues.forEach(q => q.init(v));
}

export const Queues = [Waiting, Serving, Missed];

export const RxBusy = Serving.RxData.map(v => v.length > 0);
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/combineLatest';
import 'rxjs/add/operator/first';

export const RxCanNext = Observable.combineLatest(
    Waiting.RxData.map(v => v.length > 0),
    Serving.RxData.map(v => v.length < 1),
    (emptyServing, hasWaiting) => emptyServing && hasWaiting
).filter(v => v);