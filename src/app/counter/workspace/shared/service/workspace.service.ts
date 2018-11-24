import { Injectable } from '@angular/core';
import { ReplaySubject ,  of ,  merge ,  BehaviorSubject } from 'rxjs';
import { RuntimeEnvironment, CacheService } from './shared';
import { IBranch } from '../shared';
import { ITicketAction, Workspace, IWorkspaceInitialState } from '../../../shared/model';
import { WorkspaceSocket } from './workspace.socket';
import { ITicketBooking, Ticket, ITicket } from '../../../../shared/model/house/ticket/ticket';
import { debounceTime, share, refCount, publishReplay, distinctUntilChanged, map, switchMap, first } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICounter } from '../../../../shared/model/house/counter';

export const QueueStatus = 'queue_status';

interface IBookingOnlineRespone {
    status: string;
    code: number;
    data: ITicketBooking[];
}

@Injectable()
export class WorkspaceService {
    constructor(
        private socket: WorkspaceSocket,
        private env: RuntimeEnvironment,
        private httpClient: HttpClient,
    ) { }

    private currentBranch: IBranch;
    private currentCounter: ICounter;

    private initialState$ = this.socket.RxEvent<IWorkspaceInitialState>("/initial");
    private autoNext$ = new ReplaySubject<boolean>(1);
    bookingOnlineList$ = new BehaviorSubject<ITicketBooking[]>([]);

    Workspace$ = this.initialState$.pipe(switchMap(s => {
        const w = new Workspace(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .pipe(map(action => {
                if(action.ticket.ticket_booking && action.ticket.ticket_booking.id !== ''){
                    if(action.action === 'finish' || action.action === 'call' || action.action ==='cancel'){
                        let state
                        if(action.action === 'finish'){
                            state = 'finished'
                        }else if(action.action === 'call'){
                            state = 'call'
                        }else if(action.action === 'cancel'){
                            state = 'cancelled'
                        }
                        this.sendBookingFinish(action.ticket, state);
                    }
                }

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
                console.log(w)
            }));
        const autoNext = this.autoNext$.pipe(map(a => {
            w.AutoNext = a;
        }));
        return merge(of(null), ticketUpdate, autoNext).pipe(map(_ => w));
    }),debounceTime(20),share(),publishReplay(1),refCount());

    currentCounter$ = this.Workspace$.pipe(map(w => w.current_counter));
    counters$ = this.Workspace$.pipe(map(w => w.counters));
    stat$ = this.Workspace$.pipe(map(w => w.stat),share(),publishReplay(1),refCount());

    services$ = this.Workspace$.pipe(
        map(w => w.storeServicable),
        distinctUntilChanged(),
        map(serviable => {
            return CacheService.RxListView.value
                .filter(s => serviable.has(s.id));
        }));

    get Socket() {
        return this.socket;
    }

    enable() {
        this.socket.onInit();
        this.env.Auth.Data$.pipe(first()).subscribe(data => this.currentBranch = data.branches.find(branch => branch.name === data.store));
        this.Workspace$.pipe(map(w => w.Waiting), debounceTime(100)).subscribe(queue => {
            let ticket = queue.GetFirstTicket();
            let a = !ticket || ticket === undefined ? {} : ticket
            
            a['counter_id'] = queue['counter_id'];
            let data = {
                next_ticket: a,
                waiting_size: queue.size
            }
            this.socket.Send<any>("/queue_status", data);
        })
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
        this.httpClient.get('http://123.31.12.147:9999/api/booking/ticket/branch_cetm_tickets', { params: params })
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

    sendBookingFinish(t: ITicket, state: string){
        let user = this.env.Auth.Me();
        let currentTime = Math.floor(Date.now() /1000);
        // let host = this.env.Platform.HttpBooking;
        let host = 'http://123.31.12.147:9999';
        this.httpClient.post(`${host}/api/booking/ticket/cetm_update`,{
            bticket_id: t.ticket_booking ? t.ticket_booking.id : '',
            branch_id: t.branch_id,
            teller: user.fullname,
            avatar_teller: user.public_avatar,
            teller_id: user.id,
            service_id: t.service_id,
            id_ticket_cetm: t.id,
            cnum_cetm: t.cnum,
            // tracks: t.tracks,
            status: state,
            serving_at: t.tracks[t.tracks.length-1].mtime,
            waiting_time: t.tracks[t.tracks.length-1].mtime - t.tracks[t.tracks.length -2].mtime,
            serving_time: Math.abs(currentTime - t.tracks[t.tracks.length-1].mtime)
        }).subscribe(_ => "") 
    }
}

