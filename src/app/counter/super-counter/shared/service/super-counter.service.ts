import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
    AuthService,
    RuntimeEnvironment,
    CacheService
} from '../../../shared';

import {
    ITicketAction
} from '../../../shared/model';

import {
    counterDetail,
    SuperCounter, ISuperCounterInitialState
} from '../../shared/model';

import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SuperCounterSocket } from './super-counter.socket';

@Injectable()
export class SuperCounterService {
    constructor(
        private authService: AuthService,
        private socket: SuperCounterSocket,
        private env: RuntimeEnvironment
    ) { }


    private initialState$ = this.socket.RxEvent<ISuperCounterInitialState>("/initial");
    private autoNext$ = new ReplaySubject<boolean>(1);

    get Socket() {
        return this.socket;
    }

    enable() {
        this.socket.onInit();
    }

    disable() {
        this.socket.onDestroy();
    }

    SetAutoNext(auto = false) {
        this.autoNext$.next(auto);
    }

    Workspace$ = this.initialState$.switchMap(s => {
        const w = new SuperCounter(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .map(action => {
                w.Update(action);
            });
        const autoNext = this.autoNext$.map(a => {
            w.AutoNext = a;
        });
        return merge(of(null), ticketUpdate, autoNext).map(_ => w);
    }).debounceTime(20).share().publishReplay(1).refCount();

    SelectedCounter$ = new BehaviorSubject<counterDetail>(null);
}
