import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
    AuthService,
    RuntimeEnvironment,
    CacheService
} from './shared';

import {
    ICounter, ITicket,
    TicketState
} from '../shared';

import {
    IStatMap, ITicketAction,
    Workspace, IWorkspaceInitialState
} from '../model';

import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

const SOCKET_LINK = "/room/counter/join";
import { WorkspaceSocket } from './workspace.socket';

@Injectable()
export class WorkspaceService {
    constructor(
        private authService: AuthService,
        private socket: WorkspaceSocket,
        private env: RuntimeEnvironment
    ) { }

    get Socket() {
        return this.socket;
    }

    enable() {
        this.socket.onInit();
        this.setUser();
    }

    disable() {
        this.socket.onDestroy();
    }


    stat$ = this.socket.RxEvent<IStatMap>("/stat").share();
    private initialState$ = this.socket.RxEvent<IWorkspaceInitialState>("/initial");

    Workspace$ = this.initialState$.switchMap(s => {
        const w = new Workspace(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .map(action => {
                w.Update(action);
            });
        return merge(of(null), ticketUpdate).map(_ => w);
    }).share();

    private setUser() {
        this.socket.Connected$.switchMap(() => {
            return this.env.Auth.Data$.switchMap(data => {
                return this.socket.Send("/set_user", { user_id: data.me.id });
            })
        }).subscribe();
    }

    currentCounter$ = this.socket.RxEvent<ICounter>("/counter");
    counters$ = this.Workspace$.map(w => w.counters);
    services$ = this.counters$.combineLatest(
        CacheService.RxListView,
        (counters, allServices) => {
            const servicable = {}
            counters.forEach(c => {
                c.services.forEach(id => servicable[id] = true)
                c.vservices = c.vservices || []
                c.vservices.forEach(id => servicable[id] = true)
            })
            const services = allServices.filter(s => servicable[s.id]);
            return services.sort((a, b) => a.name > b.name ? 1 : -1);
        });
}
