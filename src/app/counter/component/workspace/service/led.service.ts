import { Injectable } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../../shared';
import { WorkspaceService } from './workspace.service';
import { QueueService } from './queue.service';
import { TicketService } from './ticket.service';
import { NewLedController, LedController } from '../../../device/led';

const STATUS = {
    WELCOME: "welcome",
    STOP: "stop",
    SHOW: "show"
}

interface LedStatus {
    type: string;
    data: any;
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

    ledDevice: LedController;


    private socket = this.workspaceService.Socket;
    private onInit() {
        this.workspaceService.currentCounter$.switchMap(c => {
            this.ledDevice = NewLedController(c.dev_addr);
            return this.ticketService.autoNext$.switchMap(auto => {
                return this.queueService.serving$.debounceTime(250).map(t => {
                    const s = <LedStatus>{};
                    const first = t[0];
                    if (first) {
                        s.type = STATUS.SHOW;
                        s.data = first.cnum;
                    } else {
                        s.type = auto ? STATUS.WELCOME : STATUS.STOP;
                    }
                    return s;
                })
            })
        }).subscribe(status => {
            this.SendStatus(status);
        });
    }

    private SendStatus(status: LedStatus) {
        switch (status.type) {
            case STATUS.WELCOME:
                this.ledDevice.Welcome();
                break;
            case STATUS.STOP:
                this.ledDevice.Stop();
                break;
            case STATUS.SHOW:
                this.ledDevice.Show(status.data);
                break;
        }
    }

    private sendToServerVersion1(status: LedStatus) {
        const type = status.type === STATUS.SHOW ? status.data : status.type;
        return this.socket.Send("/status", {
            status: type
        })
    }
}
