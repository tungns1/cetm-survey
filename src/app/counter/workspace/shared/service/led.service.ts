import { Injectable } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../shared';
import { WorkspaceService } from './workspace.service';
import { QueueService } from './queue.service';
import { TicketService } from './ticket.service';
import { LedDevice } from '../device';
import { WorkspaceSocket } from './workspace.socket';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import { interval } from 'rxjs/observable/interval';

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
export class LedService{
    constructor(
        private queueService: QueueService,
        private ticketService: TicketService,
        private ledDevice: LedDevice,
        private workspaceService: WorkspaceService,
        private socket: WorkspaceSocket
    ) {

    }
    
    enable(led_com_port: string, led_address: number) {
        this.ledDevice.SetCOMPort(led_com_port);
        this.ledDevice.Setup(led_address);
        this.workspaceService.Workspace$.debounceTime(250)
            .map(w => {
                const s: LedStatus = {
                    addr: led_address,
                    type: STATUS.WELCOME,
                };
                if (w.Serving.is_empty) {
                    s.type = w.AutoNext ? STATUS.WELCOME : STATUS.STOP;
                } else {
                    s.type = STATUS.SHOW;
                    s.data = w.Serving.GetFirstTicket().cnum;
                }
                return s;
            }).distinctUntilChanged((a, b) => a.type === b.type && a.data == b.data).subscribe(status => {
                this.SendStatus(status);
            });
        interval(60 * 1000).subscribe(_ => {
            this.ledDevice.Ping(led_address);
        });
    }

    disable() {

    }

    private SendStatus(status: LedStatus) {
        switch (status.type) {
            case STATUS.WELCOME:
                this.ledDevice.On(status.addr);
                break;
            case STATUS.STOP:
                this.ledDevice.Stop(status.addr);
                break;
            case STATUS.SHOW:
                this.ledDevice.Show(status.addr, status.data);
                break;
        }
    }

    private sendToServerVersion1(status: LedStatus) {
        console.log("send to server led..........");
        const type = status.type === STATUS.SHOW ? status.data : status.type;
        return this.socket.Send("/status", {
            status: type
        })
    }
}
