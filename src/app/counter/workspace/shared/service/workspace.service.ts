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
} from '../../../shared/model';

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
    private autoNext$ = new ReplaySubject<boolean>(1);

    SetAutoNext(auto = false) {
        this.autoNext$.next(auto);
    }

    Workspace$ = this.initialState$.switchMap(s => {
        const w = new Workspace(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .map(action => {
                w.Update(action);
            });
        const autoNext = this.autoNext$.map(a => {
            w.AutoNext = a;
        });
        return merge(of(null), ticketUpdate, autoNext).map(_ => w);
    }).debounceTime(20).share().publishReplay(1).refCount();

    currentCounter$ = this.Workspace$.map(w => w.current_counter);
    counters$ = this.Workspace$.map(w => w.counters);
    stat$ = this.Workspace$.map(w => w.stat)
        .share().publishReplay(1).refCount();

    services$ = this.Workspace$.map(w => w.storeServicable)
        .distinctUntilChanged()
        .map(serviable => {
            return CacheService.RxListView.value
                .filter(s => serviable.has(s.id));
        });
}
