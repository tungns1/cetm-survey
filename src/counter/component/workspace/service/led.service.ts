import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../../shared';
import { WorkspaceService } from './workspace.service';
import { QueueService } from './queue.service';
import { TicketService } from './ticket.service';
import { of } from 'rxjs/observable/of';

const STATUS = {
    WELCOME: "welcome",
    STOP: "stop"
}

@Injectable()
export class LedService {
    constructor(
        private queueService: QueueService,
        private ticketService: TicketService,
        private workspaceService: WorkspaceService
    ) {
        this.onInit();
    }

    private socket = this.workspaceService.Socket;
    private onInit() {
        this.ticketService.autoNext$.switchMap(auto => {
            return this.queueService.serving$.debounceTime(250).map(t => {
                const first = t[0];
                return first ?
                    first.cnum :
                    (auto ? STATUS.WELCOME : STATUS.STOP);
            })
        }).switchMap(status => {
            console.log("====", status);
            return this.SendStatus(status);
        }).subscribe();
    }

    private SendStatus(status: string) {
        return this.socket.Send("/status", {
            status: status
        });
    }

    ShowWelcome() {
        this.SendStatus("welcome");
    }

    ShowStop() {
        this.SendStatus("stop");
    }
}
