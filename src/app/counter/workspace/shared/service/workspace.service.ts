import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService, RuntimeEnvironment, CacheService } from './shared';
import { ICounter, ITicket, TicketState, IBranch, ICustomer } from '../shared';
import { ITicketAction, Workspace, IWorkspaceInitialState } from '../../../shared/model';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { WorkspaceSocket } from './workspace.socket';

const SOCKET_LINK = "/room/counter/join";

export interface IBookingOnline {
    id: string;
    created_at: number;
    updated_at: number;
    customer: ICustomer;
    time_go_bank: number;
    service_id: string;
    branch_id: string;
    type_ticket: string;
    lang: string;
    customer_code: string;
    customer_id: string;
    check_in_at: number;
    id_ticket_cetm: string;
    cnum_cetm: string;
    teller: string;
    serving_time: string;
    wating_time: string;
    status: string;
}

interface IBookingOnlineRespone {
    status: string;
    code: number;
    data: IBookingOnline[];
}

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
    private interval;

    private initialState$ = this.socket.RxEvent<IWorkspaceInitialState>("/initial");
    private autoNext$ = new ReplaySubject<boolean>(1);
    bookingOnlineList$ = new ReplaySubject<IBookingOnline[]>(1);


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

    get Socket() {
        return this.socket;
    }

    enable() {
        this.socket.onInit();
        this.env.Auth.Data$.subscribe(data => this.currentBranch = data.branches.find(branch => branch.name === data.store));
        this.currentCounter$.subscribe(counter => this.currentCounter = counter);
        this.interval = setInterval(_ => {
            this.getBookingOnlineList();
        }, 5000)
    }

    disable() {
        this.socket.onDestroy();
        clearInterval(this.interval);
    }
    SetAutoNext(auto = false) {
        this.autoNext$.next(auto);
    }

    getBookingOnlineList() {
        let params = new HttpParams().set('branch_id', this.currentBranch.id)
        this.httpClient.get('http://123.31.12.147:8989/api/booking/ticket/branch_cetm_tickets', { params: params })
            .subscribe((respone: IBookingOnlineRespone) => {
                if (respone.status === 'ok' && respone.data)
                    this.bookingOnlineList$.next(respone.data.filter(d => {
                        return (d.type_ticket === 'book_schedule' && (this.currentCounter.services.indexOf(d.service_id) != -1));
                    }).sort((a, b) => {
                        if(a.check_in_at > b.check_in_at) return 1;
                        if(a.check_in_at < b.check_in_at) return -1;
                        else return 0;
                    }));
            });
    }
}
