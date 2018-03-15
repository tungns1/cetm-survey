import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ITicket, Ticket, IService, TicketState, TicketStates, RuntimeEnvironment } from '../shared';
import { Workspace } from '../../../shared/model';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { WorkspaceSettingService } from '../counter-setting.service';
import { ActionManager, TicketAction, TicketActionName } from './shared';
import { QmsService } from '../shared';

interface ISyncBookingTicket {
    teller: string;
    bticket_id: string;
    check_in_at: number;
    id_ticket_cetm: string;
    cnum_cetm: string;
    status: string;
    serving_time?: string;
    wating_time: string;
}

@Injectable()
export class TicketService {
    constructor(
        private qms: QmsService,
        private workspaceService: WorkspaceService,
        private settingService: WorkspaceSettingService,
        private queueService: QueueService,
        private env: RuntimeEnvironment,
        private httpClient: HttpClient
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;
    private platform = this.qms.platform || "other";

    private manager = new ActionManager((ta: TicketAction) => this.sendAction(ta));

    private teller: string = '';

    private sendAction(body: TicketAction) {
        const data = <TicketAction>{
            action: body.action,
            ticket_id: body.ticket_id,
            state: body.state,
            service_id: body.service_id,
            extra: body.extra
        }

        return this.socket.Send<ITicket>("/ticket", data).share();
    }

    Move(t: Ticket, services: string[], counters: string[]) {
        return this.manager.Work("move", t, { services, counters });
    }

    Search(cnum: string) {
        return this.socket.Send<ITicket[]>('/search', {
            cnum: cnum
        });
    }

    private onInit() {
        let failed_count = 0;
        this.workspaceService.Workspace$.subscribe(w => {
            if (!w.AutoNext) return;
            if (w.is_busy) {
                this.workspaceService.SetAutoNext(false);
                return;
            }
            const t = w.Waiting.GetFirstTicket();
            if (!t) return;
            const lastQueueUpdate = w.LastUpdate;
            this.TriggerAction("call", t).subscribe(_ => {
                failed_count = 0;
            }, e => {
                // call failed
                const ten_second = 10 * 1000;
                failed_count++;
                setTimeout(_ => {
                    // the workspace was not updated
                    if (w.LastUpdate <= lastQueueUpdate) {
                        console.log("the workspace was not updated");
                        // this.workspaceService.Socket.reset();
                    }
                }, ten_second);
            });
        });
        this.env.Auth.User$.subscribe(u => this.teller = u.fullname);
    }

    TriggerAction(action: TicketActionName, ticket: Ticket) {
        this.SyncBookingSystem(action, ticket);
        return this.manager.Work(action, ticket, {
            record_transaction: this.settingService.EnableRecordTransaction,
            platform: this.platform,
        });
    }

    private SyncBookingSystem(action: TicketActionName, ticket: Ticket) {
        if (ticket && ticket.ticket_booking.id && (action === 'finish' || action === 'cancel' || action === 'move')) {
            let body: ISyncBookingTicket = {
                teller: this.teller,
                bticket_id: ticket.ticket_booking.id,
                check_in_at: ticket.ticket_booking.check_in_at,
                id_ticket_cetm: ticket.id,
                cnum_cetm: ticket.cnum,
                status: action === 'finish' ? 'finished' : action === 'cancel' ? 'cancelled' : 'waiting',
                serving_time: (new Date().getTime() - ticket.mtime).toString(),
                wating_time: (ticket.mtime - ticket.ctime).toString()
            }
            this.httpClient.post('http://123.31.12.147:8989/api/booking/ticket/cetm_update', body)
                .subscribe(respone => {});

        }
    }

}
