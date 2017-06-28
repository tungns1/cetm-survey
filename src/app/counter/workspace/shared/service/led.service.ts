import { Injectable, OnInit } from '@angular/core';
import { ITicket, TicketState, TicketStates, CounterSettingService } from '../shared';
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
    cmd: string;
    text?: string;
}


@Injectable()
export class LedService {
    constructor(
        private queueService: QueueService,
        private ledDevice: LedDevice,
        private workspaceService: WorkspaceService
    ) {

    }

    enable(led_address: number, remote?: boolean, com_port?: string) {
        this.led_address = led_address;
        if (remote) {
            this.enable_remote();
        }
        if (com_port) {
            this.enable_local(com_port);
        }
    }

    private enable_local(led_com_port: string) {
        this.ledDevice.Initialize(led_com_port);
        this.status$.subscribe(status => {
            this.sendToDevice(status);
        });
        interval(60 * 1000).subscribe(_ => {
            this.ledDevice.Ping(this.led_address);
        });
    }

    private enable_remote() {
        this.status$.subscribe(status => {
            this.sendToServer(status);
        });
    }

    disable() {

    }

    private status$ = this.workspaceService.Workspace$.debounceTime(250)
        .map(w => {
            const s: LedStatus = {
                addr: this.led_address,
                cmd: STATUS.WELCOME,
            };
            if (w.Serving.is_empty) {
                s.cmd = w.AutoNext ? STATUS.WELCOME : STATUS.STOP;
            } else {
                s.cmd = STATUS.SHOW;
                s.text = w.Serving.GetFirstTicket().cnum;
            }
            return s;
        }).distinctUntilChanged((a, b) => a.cmd === b.cmd && a.text == b.text)

    private sendToDevice(status: LedStatus) {
        switch (status.cmd) {
            case STATUS.WELCOME:
                this.ledDevice.On(status.addr);
                break;
            case STATUS.STOP:
                this.ledDevice.Stop(status.addr);
                break;
            case STATUS.SHOW:
                this.ledDevice.Show(status.addr, status.text);
                break;
        }
    }

    private sendToServer(status: LedStatus) {
        console.log("send to server led..........", status);
        return this.workspaceService.Socket.Send("/led_status", status);
    }

    private led_address = 0;
}
