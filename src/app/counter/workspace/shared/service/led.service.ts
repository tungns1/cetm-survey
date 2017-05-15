import { Injectable } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../shared';
import { WorkspaceService } from './workspace.service';
import { QueueService } from './queue.service';
import { TicketService } from './ticket.service';
import { LedDevice } from '../device';
import { WorkspaceSocket } from './workspace.socket';

const STATUS = {
    WELCOME: "welcome",
    STOP: "stop",
    SHOW: "show"
}

interface LedStatus {
    addr: number;
    type: string;
    data?: any;
}


@Injectable()
export class LedService {
    constructor(
        private queueService: QueueService,
        private ticketService: TicketService,
        private ledDevice: LedDevice,
        private workspaceService: WorkspaceService,
        private socket: WorkspaceSocket
    ) {

    }

    enable() {
        this.workspaceService.currentCounter$.switchMap(c => {
            return this.ticketService.autoNext$.switchMap(auto => {
                return this.queueService.serving$.debounceTime(250).map(t => {
                    console.log("........c.dev_addr", c.dev_addr);
                    const s: LedStatus = {
                        addr: c.dev_addr,
                        type: STATUS.WELCOME,
                    };
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
        return true;
    }

    disable() {

    }

    private SendStatus(status: LedStatus) {
        switch (status.type) {
            case STATUS.WELCOME:
            console.log(".....................status.welcome");
                this.ledDevice.On(status.addr);
                break;
            case STATUS.STOP:
            console.log(".....................status.stop");
                this.ledDevice.Off(status.addr);
                break;
            case STATUS.SHOW:
            console.log(".....................status.show");
        this.ledDevice.Setup(status.addr);
                this.ledDevice.Show(status.addr, status.data);
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
