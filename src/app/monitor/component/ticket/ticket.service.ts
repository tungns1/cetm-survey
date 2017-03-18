import { Injectable } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IExtendedTicket, ITickets, ISummary, Summary } from '../../model';
import { AppSocket, HttpApi } from '../../../shared/service/backend';
import { MonitorFilterService } from '../shared';
import {
    CacheCounter, CacheUsers,
    ICounter, IUser, ICustomer
} from '../../../shared/model';

interface IFocusReply {
    counters: ICounter[];
    users: IUser[];
    tickets: ITickets;
}

const MonitorSocketLink = "/room/monitor/join";

export const RxInfoCustomer = new BehaviorSubject<ICustomer>(null);
@Injectable()
export class MonitorTicketService {
    constructor(
        private filterService: MonitorFilterService
    ) { }

    private socket = new AppSocket(MonitorSocketLink);

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
        return this.filterService.ValueChanges.switchMap(filter => {
            const branches = filter.Branch.GetBranchIDByLevel(0);
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
            return AddToSet(initial, new Summary(s), o => o.branch_id === s.branch_id);
        }
        return this.summaryUpdate$.map(add);
    });

    private initialFocus$ = this.socket.Connected$.switchMap(_ => {
        return this.filterService.ValueChanges.switchMap(filter => {
            const branch_id = filter.GetFocus();
            return this.socket.Send<IFocusReply>("/focus", {
                branch_id
            }).do(data => {
                CacheCounter.Refresh(data ? data.counters : []);
                CacheUsers.Refresh(data ? data.users : []);
            });
        });
    }).share();

    private ticketUpdate$ = this.socket.RxEvent<IExtendedTicket>("/ticket/update").startWith(null);

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

    Unfocus() {
        this.socket.Send("/focus", {}).subscribe();
    }
    GetInfoCustomer(idCustomer: string) {
        return this.apiCustomer.Get<ICustomer>("get_customer_by_id", { id: idCustomer });
    }
    apiCustomer = new HttpApi<any>("/api/monitor");
}

function AddToSet<T>(arr: T[] = [], a: T, checker: (old: T) => boolean) {
    if (!a) {
        return arr;
    }
    const i = arr.findIndex(checker);
    const v: T[] = [].concat(arr);
    if (i < 0) {
        v.push(a);
    } else {
        v[i] = a;
    }
    return v;
}