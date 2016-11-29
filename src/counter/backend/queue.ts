import { Model } from '../shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const TicketStateWaiting = "waiting";
const TicketStateServing = "serving";
const TicketStateMissed = "missed";

class Queue {
    constructor(private state: string) {

    }

    RxData = new BehaviorSubject<Model.ITicket[]>([]);
    private data = new Map<string, Model.ITicket>();

    static sort(a: Model.ITicket, b: Model.ITicket) {
        if (a.priority === b.priority) {
            return a.mtime < b.mtime ? 0 : 1;
        }
        return a.priority > b.priority ? 0 : 1;
    }

    init(data: Model.ITicket[]) {
        this.data.clear();
        data.forEach(d => {
            if (d.state === this.state) {
                this.data.set(d.id, d);
            }
        })
        this.refresh();
    }

    update(t: Model.ITicket) {
        if (t.state !== this.state) {
            this.data.delete(t.id);
        } else {
            this.data.set(t.id, t);
        }
        this.refresh();
    }

    private refresh() {
        let arr: Model.ITicket[] = [];
        this.data.forEach(d => {
            arr.push(d);
        })
        arr.sort(Queue.sort);
        console.log(arr);
        this.RxData.next(arr);
    }

    first() {
        return this.RxData.value[0];
    }

    count() {
        return this.RxData.map(v => v.length);
    }

}


export const Waiting = new Queue(TicketStateWaiting)
export const Serving = new Queue(TicketStateServing);
export const Missed = new Queue(TicketStateMissed);

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