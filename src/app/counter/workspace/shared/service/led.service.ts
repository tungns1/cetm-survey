import { Injectable, OnInit } from '@angular/core';
import { ITicket, TicketState, TicketStates } from '../shared';
import { WorkspaceService } from './workspace.service';
import { QueueService } from './queue.service';
import { TicketService } from './ticket.service';
import { LedDevice } from '../device';
import { WorkspaceSocket } from './workspace.socket';
import { combineLatest ,  interval } from 'rxjs';
import { ILedStatus, LED_STATUS } from '../../../shared/model';
import { distinctUntilChanged, share, publishReplay, refCount, debounceTime, map } from 'rxjs/operators';

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

    private status$ = this.workspaceService.Workspace$.pipe(debounceTime(250)
        ,map(w => {
            const s: ILedStatus = {
                addr: this.led_address,
                cmd: LED_STATUS.WELCOME,
            };
            if (w.Serving.is_empty) {
                s.cmd = w.AutoNext ? LED_STATUS.WELCOME : LED_STATUS.STOP;
            } else {
                s.cmd = LED_STATUS.SHOW;
                s.text = w.Serving.GetFirstTicket().cnum;
            }
            return s;
        }),
        distinctUntilChanged((a, b) => a.cmd === b.cmd && a.text == b.text),
        share(),
        publishReplay(1),
        refCount());

    private sendToDevice(status: ILedStatus) {
        this.ledDevice.SendStatus(status);
    }

    private sendToServer(status: ILedStatus) {
        console.log("send to server led..........", status);
        return this.workspaceService.Socket.Send("/led_status", status);
    }

    private led_address = 0;
}
