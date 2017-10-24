import { ITicket, Ticket, IService, TicketState, TicketStates } from '../shared';
import { Workspace } from '../../../shared/model';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { Injectable } from '@angular/core';
import { CounterSettingService } from './shared';
import { ActionManager, TicketAction, TicketActionName } from './shared';
import { QmsService } from '../shared';

@Injectable()
export class TicketService {
    constructor(
        private qms: QmsService,
        private workspaceService: WorkspaceService,
        private settingService: CounterSettingService,
        private queueService: QueueService
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;
    private platform = this.qms.platform || "other";

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

    private manager = new ActionManager((ta: TicketAction) => {
        return this.sendAction(ta);
    });

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
    }

    TriggerAction(action: TicketActionName, ticket: Ticket) {
        return this.manager.Work(action, ticket, {
            record_transaction: this.settingService.EnableRecordTransaction,
            platform: this.platform,
        });
    }
}
