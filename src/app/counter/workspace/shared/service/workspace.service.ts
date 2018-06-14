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

// export interface ITicketBooking {
//     id: string;
//     created_at: number;
//     updated_at: number;
//     customer: ICustomer;
//     time_go_bank: number;
//     service_id: string;
//     branch_id: string;
//     type_ticket: string;
//     lang: string;
//     customer_code: string;
//     customer_id: string;
//     check_in_at: number;
//     id_ticket_cetm: string;
//     cnum_cetm: string;
//     teller_id: string;
//     teller: string;
//     serving_time: string;
//     wating_time: string;
//     status: string;
// }

interface IBookingOnlineRespone {
    status: string;
    code: number;
    data: ITicketBooking[];
}

interface ISyncBookingTicket {
    teller: string;
    avatar_teller: string;
    teller_id: string;
    bticket_id?: string;
    check_in_at: number;
    id_ticket_cetm: string;
    cnum_cetm: string;
    status: string;
    serving_time: number;
    waiting_time: number;
    serving_at?: number;
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
                    if (action.ticket.id) {
                        this.syncBookingSystem(action);
                    }
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
            this.getBookingOnlineList();
        });
    }

    disable() {
        this.socket.onDestroy();
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
                        if (a.check_in_at >= b.check_in_at) return 1;
                        if (a.check_in_at < b.check_in_at) return -1;
                    }));
            });
    }

    private updateBooking(bookingTicket: ITicketBooking) {
        this.bookingOnlineList$
    }

    private syncBookingSystem(action: ITicketAction) {
        if ((action.action === 'finish' || action.action === 'move' || action.action === 'cancel') && action.counter_id === this.currentCounter.id) {
            let body: ISyncBookingTicket = {
                teller: this.currentUser.fullname,
                avatar_teller: this.currentUser.public_avatar || '',
                teller_id: this.currentUser.id,
                bticket_id: action.ticket.ticket_booking.id,
                check_in_at: action.ticket.ticket_booking.check_in_at,
                id_ticket_cetm: action.ticket.id,
                cnum_cetm: action.ticket.cnum,
                status: action.ticket.state,
                serving_time: this.getServingTime(JSON.parse(JSON.stringify(action.ticket.tracks)).reverse()),
                waiting_time: this.getWaitingTime(JSON.parse(JSON.stringify(action.ticket.tracks))),
                serving_at: this.getServingAt(this.getServingTime(JSON.parse(JSON.stringify(action.ticket.tracks)).reverse()))
            }
            this.httpClient.post('http://123.31.12.147:8989/api/booking/ticket/cetm_update', body).subscribe();
        }
    }

    private getServingTime(tracksReverse: ITicketTrack[]): number {
        let lastServingTime = tracksReverse.find(checkPoint => checkPoint.state === 'serving');
        if (lastServingTime) {
            return tracksReverse[0].mtime - lastServingTime.mtime;
        }
        return 0;
    }

    private getWaitingTime(tracks: ITicketTrack[]): number {
        let result: number = 0;
        tracks.forEach((track, i) => {
            if (track.state === 'waiting') {
                result += tracks[i + 1] ? (tracks[i + 1].mtime - track.mtime) : 0;
            }
        })
        return result;
    }

    private getServingAt(serving_time: number):number{
        let now = Math.floor(Date.now() / 1000)
        return (now - serving_time)
    }
}
