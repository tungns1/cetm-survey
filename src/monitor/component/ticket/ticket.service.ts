import { Injectable } from '@angular/core';
import { SharedService, Model } from '../../shared';
import { ACTION, IAppState } from './reducers';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ITicket, ITickets, ISummary } from '../../model';
import { MonitorFilterService } from '../shared';

interface IFocusReply {
    counters: Model.House.ICounter[];
    users: Model.Org.IUser[];
    tickets: ITickets;
}

const MonitorSocketLink = "/room/monitor/join";

@Injectable()
export class MonitorTicketService {
    constructor(
        private filterService: MonitorFilterService
    ) { }

    private socket = new SharedService.Backend.AppSocket(MonitorSocketLink);

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
            }).map(data => data || []);
        });
    }).share();

    private summaryUpdate$ = this.socket.RxEvent<ISummary>("/summary/update").startWith(null);

    summary$ = this.initialSummary$.switchMap(initial => {
        const add = (s: ISummary) => {
            return AddToSet(initial, s, o => o.branch_id === s.branch_id);
        }
        return this.summaryUpdate$.map(add);
    });

    private initialFocus$ = this.socket.Connected$.switchMap(_ => {
        return this.filterService.ValueChanges.switchMap(filter => {
            const branch_id = filter.GetFocus();
            return this.socket.Send<IFocusReply>("/focus", {
                branch_id
            }).do(data => {
                Model.House.CacheCounter.Refresh(data ? data.counters : []);
                Model.Org.CacheUsers.Refresh(data ? data.users : []);
            });
        });
    }).share();

    private ticketUpdate$ = this.socket.RxEvent<ITicket>("/ticket/update").startWith(null);

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