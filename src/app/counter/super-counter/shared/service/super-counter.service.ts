import { Injectable } from '@angular/core';
import { ReplaySubject ,  of ,  merge ,  BehaviorSubject } from 'rxjs';
import {
    AuthService,
    RuntimeEnvironment,
    CacheService
} from '../../../shared';

import {
    ITicketAction
} from '../../../shared/model';

import {
    counterDetail, IMarkAsCheck,
    SuperCounter, ISuperCounterInitialState
} from '../../shared/model';
import { ITicket } from '../shared';

import { SuperCounterSocket } from './super-counter.socket';
import { debounceTime, share, publishReplay, refCount, map, switchMap } from 'rxjs/operators';

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

    private initialState$ = this.socket.RxEvent<ISuperCounterInitialState>('/initial');
    private autoNext$ = new ReplaySubject<boolean>(1);
    SelectedCounter$ = new BehaviorSubject<counterDetail>(null);
    markAsCheck$ = new BehaviorSubject<IMarkAsCheck>(null)

    serviceList$ = this.initialState$.pipe(map(initData => {
        return initData.services;
    }))

    AppState$ = new BehaviorSubject<SuperCounter>(null);

    Workspace$ = this.initialState$.pipe(switchMap(s => {
        const w = new SuperCounter(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>('/ticket_action')
            .pipe(map(action => {
                w.Update(action);
            }));
        const markAsCheck = this.socket.RxEvent<IMarkAsCheck>('/mark_as_check')
            .pipe(map(mark => {
                w.counterList.Mark(mark)
            }))
        const autoNext = this.autoNext$.pipe(map(a => {
            w.AutoNext = a;
        }));
        const selectedCounter = this.SelectedCounter$.pipe(map(c => {
            w.counterList.select(c)
        }));
        return merge(of(null), ticketUpdate, autoNext, selectedCounter, markAsCheck).pipe(map(_ => w));
    }),debounceTime(20),share(),publishReplay(1),refCount());

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

    markAsCheck(counterID: string, ticket: ITicket) {
        if (this.SelectedCounter$.value.state === 'calling') {
            let data: IMarkAsCheck = {
                counterID: counterID,
                ticketID: ticket.id
            }
            this.socket.Send<IMarkAsCheck>('/mark_as_check', data).subscribe(d => {})
        }
    }
}
