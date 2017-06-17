import { ITicket, Ticket, IService, TicketState, TicketStates } from '../shared';
import { Workspace } from '../model';
import { QueueService } from './queue.service';
import { WorkspaceService } from './workspace.service';
import { Injectable } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { RecorderService } from './recorder.service';

import { ActionManager, TicketAction, TicketActionName } from './shared';

@Injectable()
export class TicketService {
    constructor(
        private workspaceService: WorkspaceService,
        private recorderService: RecorderService,
        private feedbackService: FeedbackService,
        private queueService: QueueService
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;

    private sendAction(body: TicketAction) {
        return this.socket.Send<ITicket>("/ticket", body).share();
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
        this.workspaceService.Workspace$.subscribe(w => {
            if (!w.AutoNext) return;
            if (w.is_busy) {
                this.workspaceService.SetAutoNext(false);
                return;
            }
            const t = w.Waiting.GetFirstTicket();
            if (!t) return;
            this.TriggerAction("call", t);
        });
    }

    TriggerAction(action: TicketActionName, ticket: Ticket) {
        return this.manager.Work(action, ticket);
    }
}
