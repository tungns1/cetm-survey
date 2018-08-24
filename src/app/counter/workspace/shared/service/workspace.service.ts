import { Injectable } from '@angular/core';
import { ReplaySubject ,  of ,  merge ,  BehaviorSubject } from 'rxjs';
import { RuntimeEnvironment, CacheService } from './shared';
import { IBranch } from '../shared';
import { ITicketAction, Workspace, IWorkspaceInitialState } from '../../../shared/model';
import { WorkspaceSocket } from './workspace.socket';
import { ITicketBooking } from '../../../../shared/model/house/ticket/ticket';
import { debounceTime, share, refCount, publishReplay, distinctUntilChanged, map, switchMap, first } from 'rxjs/operators';

export const QueueStatus = 'queue_status';

@Injectable()
export class WorkspaceService {
    constructor(
        private socket: WorkspaceSocket,
        private env: RuntimeEnvironment,
    ) { }

    private currentBranch: IBranch;

    private initialState$ = this.socket.RxEvent<IWorkspaceInitialState>("/initial");
    private autoNext$ = new ReplaySubject<boolean>(1);
    bookingOnlineList$ = new BehaviorSubject<ITicketBooking[]>([]);

    Workspace$ = this.initialState$.pipe(switchMap(s => {
        const w = new Workspace(s);
        const ticketUpdate = this.socket.RxEvent<ITicketAction>("/ticket_action")
            .pipe(map(action => {
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
        this.Workspace$.pipe(map(w => w.Waiting)).subscribe(queue => {
            let data = {
                next_ticket: queue.GetFirstTicket(),
                waiting_size: queue.size
            }
            this.socket.Send<any>("/queue_status", data);
        })
    }

    disable() {
        this.socket.onDestroy();
    }

    SetAutoNext(auto = false) {
        this.autoNext$.next(auto);
    }
}
