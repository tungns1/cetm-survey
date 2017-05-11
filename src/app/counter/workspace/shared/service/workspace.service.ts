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
    ITicketAction,
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
    }

    disable() {
        this.socket.onDestroy();
    }


    private initialState$ = this.socket.RxEvent<IWorkspaceInitialState>("/initial");

    Workspace$ = this.initialState$.switchMap(s => {
        const w = new Workspace(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .map(action => {
                w.Update(action);
            });
        return merge(of(null), ticketUpdate).map(_ => w);
    }).do(w => console.log(w))
        .share().publishReplay(1).refCount();

    currentCounter$ = this.Workspace$.map(w => w.current_counter);
    counters$ = this.Workspace$.map(w => w.counters);
    stat$ = this.Workspace$.map(w => w.stat)
        .do(s => console.log(s))
        .share().publishReplay(1).refCount();

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
