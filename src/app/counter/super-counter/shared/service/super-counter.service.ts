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
export class SuperCounterService extends BehaviorSubject<SuperCounter> {
    constructor(
        private authService: AuthService,
        private socket: SuperCounterSocket,
        private env: RuntimeEnvironment
    ) {
        super(null);
        this.Workspace$.subscribe(w => this.AppState$.next(w));
    }

    private initialState$ = this.socket.RxEvent<ISuperCounterInitialState>("/initial");
    private autoNext$ = new ReplaySubject<boolean>(1);

    serviceList$ = this.initialState$.map(initData => {
        return initData.services;
    })

    AppState$ = new BehaviorSubject<SuperCounter>(null);

    Workspace$ = this.initialState$.switchMap(s => {
        const w = new SuperCounter(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .map(action => {
                w.Update(action);
            });
        const autoNext = this.autoNext$.map(a => {
            w.AutoNext = a;
        });
        const selectedCounter = this.SelectedCounter$.map(c => {
            w.counterList.select(c)
        });
        return merge(of(null), ticketUpdate, autoNext, selectedCounter).map(_ => w);
    }).debounceTime(20).share().publishReplay(1).refCount();

    SelectedCounter$ = new BehaviorSubject<counterDetail>(null);

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

    setCheckIn() {
        if (this.SelectedCounter$.value.state === 'calling') {
            this.SelectedCounter$.value.state = 'serving';
            this.SelectedCounter$.next(this.SelectedCounter$.value);
        }
    }
}
