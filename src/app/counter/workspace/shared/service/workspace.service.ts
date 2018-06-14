import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService, RuntimeEnvironment, CacheService } from './shared';
import { ICounter, ITicket, TicketState, IBranch, ICustomer, IUser } from '../shared';
import { ITicketAction, Workspace, IWorkspaceInitialState } from '../../../shared/model';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { WorkspaceSocket } from './workspace.socket';
import { ITicketTrack } from '..';
import { ITicketBooking } from '../../../../shared/model/house/ticket/ticket';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const SOCKET_LINK = "/room/counter/join";

@Injectable()
export class WorkspaceService {
    constructor(
        private authService: AuthService,
        private socket: WorkspaceSocket,
        private env: RuntimeEnvironment,
        private httpClient: HttpClient
    ) { }

    private currentBranch: IBranch;
    private currentCounter: ICounter;
    private currentUser: IUser;

    private initialState$ = this.socket.RxEvent<IWorkspaceInitialState>("/initial");
    private autoNext$ = new ReplaySubject<boolean>(1);
    bookingOnlineList$ = new BehaviorSubject<ITicketBooking[]>([]);


    Workspace$ = this.initialState$.switchMap(s => {
        this.currentUser = s.user;
        const w = new Workspace(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .map(action => {
                if (action.action === 'update_bticket') {
                    let currentList = this.bookingOnlineList$.value;
                    currentList.push(action.ticket.ticket_booking)
                    this.bookingOnlineList$.next(currentList.sort((a, b) => {
                        if (a.check_in_at >= b.check_in_at) return 1;
                        if (a.check_in_at < b.check_in_at) return -1;
                    }));
                } else {
                    w.Update(action);
                }
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

    get Socket() {
        return this.socket;
    }

    enable() {
        this.socket.onInit();
        this.env.Auth.Data$.subscribe(data => this.currentBranch = data.branches.find(branch => branch.name === data.store));
        this.currentCounter$.subscribe(counter => {
            this.currentCounter = counter;
        });
    }

    disable() {
        this.socket.onDestroy();
    }
    SetAutoNext(auto = false) {
        this.autoNext$.next(auto);
    }
    
}
