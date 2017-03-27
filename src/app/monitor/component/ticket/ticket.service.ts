import { Injectable } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IExtendedTicket, ITickets, ISummary, Summary, IDevice } from '../../model';


import {
    MonitorFilterService,
    HttpServiceGenerator, AppSocketGenerator
} from '../shared';


import {
    CacheCounter, CacheUsers,
    ICounter, IUser, ICustomer
} from '../../../shared/model';

interface IFocusReply {
    counters: ICounter[];
    users: IUser[];
    tickets: ITickets;
    counter_state: IDevice[];
}

const MonitorSocketLink = "/room/monitor/join";

export const RxInfoCustomer = new BehaviorSubject<ICustomer>(null);
@Injectable()
export class MonitorTicketService {
    constructor(
        private filterService: MonitorFilterService,
        private httpServiceGenerator: HttpServiceGenerator,
        private appSocketGenerator: AppSocketGenerator
    ) { }

    private socket = this.appSocketGenerator.make(MonitorSocketLink);

    onInit() {
        this.socket.Connect({});
        this.socket.disableCheckAlive();
        this.summary$.subscribe(data => console.log(data));
    }

    onDestroy() {
        this.socket.Terminate();
    }

    private subs: ISubscription[] = [];
    private initialSummary$ = this.socket.Connected$.switchMap(_ => {
        return this.filterService.Data$.switchMap(filter => {
            const branches = this.filterService.GetStores();
            return this.socket.Send<ISummary[]>("/summary", {
                branches
            }).map(data => (data || []).map(d => new Summary(d)));
        });
    }).share();

    private summaryUpdate$ = this.socket.RxEvent<ISummary>("/summary/update").startWith(null);

    summary$ = this.initialSummary$.switchMap(initial => {
        const add = (s: ISummary) => {
            if (!s) {
                return initial;
            }
            return AddToSet(initial, new Summary(s));
        }
        return this.summaryUpdate$.map(add);
    }).share();

    private initialFocus$ = this.socket.Connected$.switchMap(_ => {
        return this.filterService.Data$.switchMap(filter => {
            const branch_id = filter.focus;
            return this.socket.Send<IFocusReply>("/focus", {
                branch_id
            }).do(data => {
                CacheCounter.Refresh(data ? data.counters : []);
                CacheUsers.Refresh(data ? data.users : []);
            });
        });
    }).share();

    private ticketUpdate$ = this.socket.RxEvent<IExtendedTicket>("/ticket/update").startWith(null);
    private counterUpdate$ = this.socket.RxEvent<IDevice>("/counter_track/update").startWith(null);


    tickets$ = this.initialFocus$
        .map(data => data ? data.tickets : {})
        .switchMap(tickets => {
            return this.ticketUpdate$.map(t => {
                if (t) {
                    tickets[t.id] = t;
                }
                return tickets;
            });
        }).map(tickets => {
            return Object.keys(tickets).map(id => tickets[id]);
        });


    counter$ = this.initialFocus$
        .map(data => data ? data.counter_state : [])
        .switchMap(counters => {
            return this.counterUpdate$.map(t => {
                if (t) {
                    counters[t.id] = t;
                }
                return counters;
            });
        });


    Unfocus() {
        this.socket.Send("/focus", {}).subscribe();
    }
    GetInfoCustomer(idCustomer: string) {
        return this.apiCustomer.Get<ICustomer>("get_customer_by_id", { id: idCustomer });
    }
    apiCustomer = this.httpServiceGenerator.make<any>("/api/monitor");
}

function AddToSet(arr: Summary[] = [], a: Summary) {
    var v = arr;
    var add = true;
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].branch_id === a.branch_id) {
                v.splice(i, 1);
                v.push(a);
                add = false;
                break;
            } else {
                continue;
            }
        }
    } else {
        if (add) {
            arr.push(a);
        }

    }
    return v;
}