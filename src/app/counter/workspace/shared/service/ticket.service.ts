import { Injectable } from '@angular/core';
import { ITicket, Ticket } from '../shared';
import { WorkspaceService } from './workspace.service';
import { WorkspaceSettingService } from '../counter-setting.service';
import { ActionManager, TicketAction, TicketActionName } from './shared';
import { QmsService } from '../shared';
import { share, first } from 'rxjs/operators';

@Injectable()
export class TicketService {
    constructor(
        private qms: QmsService,
        private workspaceService: WorkspaceService,
        private settingService: WorkspaceSettingService,
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;
    private platform = this.qms.platform || "other";

    private manager = new ActionManager((ta: TicketAction) => this.sendAction(ta));

    private sendAction(body: TicketAction) {
        const data = <TicketAction>{
            action: body.action,
            ticket_id: body.ticket_id,
            state: body.state,
            service_id: body.service_id,
            extra: body.extra
        }
        return this.socket.Send<ITicket>("/ticket", data).pipe(share());
    }
    feedback: any
    Move(t: Ticket, services: string[], counters: string[]) {
        this.feedback = {
            reason_text: t ? (t.tracks[t.tracks.length - 1].feedback ? (t.tracks[t.tracks.length - 1].feedback.reason_text || null) : null) : null,
            rating: t ? (t.tracks[t.tracks.length - 1].feedback ? (t.tracks[t.tracks.length - 1].feedback.rating || null) : null) : null,
        }

        return this.manager.Work("move", t, {
            services,
            counters,
            feedback: this.feedback
        });
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
            this.TriggerAction("call", t).pipe(first()).subscribe(_ => {
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
    }

    TriggerAction(action: TicketActionName, ticket: Ticket) {
        return this.manager.Work(action, ticket, {
            record_transaction: this.settingService.EnableRecordTransaction,
            platform: this.platform,
            reason_text: ticket ? (ticket.tracks[ticket.tracks.length - 1].feedback ? (ticket.tracks[ticket.tracks.length - 1].feedback.reason_text || null) : null) : null,
            rating: ticket ? (ticket.tracks[ticket.tracks.length - 1].feedback ? (ticket.tracks[ticket.tracks.length - 1].feedback.rating || null) : null) : null,
        });
    }

}
