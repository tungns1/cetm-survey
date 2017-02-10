import { Injectable } from '@angular/core';
import { SharedService, Model } from '../../shared';
import { ACTION, IAppState } from './reducers';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ITicket, ITickets, Summary } from '../../model';

interface IFocusReply {
    counters: Model.House.ICounter[];
    users: Model.Org.IUser[];
    tickets: ITickets;
}

const MonitorSocketLink = "/room/monitor/join";

@Injectable()
export class MonitorTicketService {
    constructor(
        private store: Store<IAppState>
    ) { }

    private socket = new SharedService.Backend.AppSocket(MonitorSocketLink);

    onInit() {
        this.socket.Connect({});
        this.socket.disableCheckAlive();
    }

    onDestroy() {
        while (this.subs.length) {
            const s = this.subs.pop();
            s.unsubscribe();
        }
        this.unfocus();
        this.socket.Terminate();
    }

    private subs: ISubscription[] = [];


    observeSummaryOnBranch(branches: string[]) {
        const sub = this.socket.OnConnected(() => {
            this.socket.Send<Summary[]>("/summary", { branches }).subscribe(data => {
                if (!data) {
                    return;
                }
                this.store.dispatch({
                    type: ACTION.REFRESH_SUMMARY,
                    payload: data
                });
            });

            this.subs.push(this.socket.Subscribe("/summary/update", data => {
                this.store.dispatch({
                    type: ACTION.UPDATE_SUMMARY,
                    payload: data
                });
            }));
        });
        this.subs.push(sub);
    }

    FocusOnBranch(branch_id: string) {
        this.store.dispatch({
            type: ACTION.FOCUS_BRANCH,
            payload: branch_id
        });

        const sub = this.socket.OnConnected(() => {
            this.socket.Send<IFocusReply>("/focus", {
                branch_id
            }).subscribe(data => {
                if (!data) {
                    return;
                }
                Model.House.CacheCounter.Refresh(data.counters);
                Model.CacheUsers.Refresh(data.users);
                const tickets = Object.keys(data.tickets).map(id => data.tickets[id]);
                this.store.dispatch({
                    type: ACTION.REFRESH_TICKET,
                    payload: tickets
                });
            });
        });
        this.unfocus = () => sub.unsubscribe();
    }

    private unfocus = () => { }

    Unfocus() {
        if (this.unfocus) {
            this.unfocus();
            this.unfocus = null;
        }
        this.socket.Send("/focus", {}).subscribe();
    }

    get Summary() {
        return this.store.select<Summary[]>('summary');
    }

    get Waiting() {
        return this.store.select<ITicket[]>('waiting');
    }

    get Focus() {
        return this.store.select<Summary>("focus");
    }

    get Served() {
        return this.store.select<ITicket[]>('served');
    }
}