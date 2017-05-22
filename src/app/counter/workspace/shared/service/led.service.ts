import { Injectable } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../shared';
import { WorkspaceService } from './workspace.service';
import { QueueService } from './queue.service';
import { TicketService } from './ticket.service';
import { LedDevice } from '../device';
import { WorkspaceSocket } from './workspace.socket';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { CounterSettingService } from '../../../shared/counter-setting.service';
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
export class LedService {
    constructor(
        private queueService: QueueService,
        private ticketService: TicketService,
        private ledDevice: LedDevice,
        private workspaceService: WorkspaceService,
        private socket: WorkspaceSocket,
        private counterSettingService: CounterSettingService,
    ) {

    }
    

    enable() {
        this.ledDevice.Setup(this.led_address);
        this.ledDevice.Command_com(this.led_com);
        combineLatest(this.workspaceService.Workspace$, this.ticketService.autoNext$)
            .debounceTime(250)
            .map(([w, auto]) => {
                const s: LedStatus = {
                    addr: this.led_address,
                    type: STATUS.WELCOME,
                };
                if (w.Serving.is_empty) {
                    s.type = auto ? STATUS.WELCOME : STATUS.STOP;
                } else {
                    s.type = STATUS.SHOW;
                    s.data = w.Serving.GetFirstTicket().cnum;
                }
                return s;
            }).distinctUntilChanged((a, b) => a.type === b.type && a.data == b.data).subscribe(status => {
                this.SendStatus(status);
            });
        interval(60 * 1000).subscribe(_ => {
            this.Ping();
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

    private Ping() {
        this.ledDevice.Ping(this.led_address);
    }

    private sendToServerVersion1(status: LedStatus) {
        console.log("send to server led..........");
        const type = status.type === STATUS.SHOW ? status.data : status.type;
        return this.socket.Send("/status", {
            status: type
        })
    }

    private led_address = this.counterSettingService.AddrLed;
    private led_com = this.counterSettingService.ComLed;
}
