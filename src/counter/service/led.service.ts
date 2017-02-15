import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../model';
import { WorkspaceService } from './workspace.service';

@Injectable()
export class LedService {
    constructor(
        private workspaceService: WorkspaceService
    ) { }

    private socket = this.workspaceService.Socket;

    private SendStatus(status: string) {
        this.socket.Send("/status", {
            status: status
        }).subscribe();
    }

    ShowWelcome() {
        this.SendStatus("welcome");
    }

    ShowStop() {
        this.SendStatus("stop");
    }
}
