import { Injectable } from '@angular/core';
import { QmsService } from './shared';
import { ILedStatus, LED_STATUS } from '../model';

@Injectable()
export class LedDevice {
    constructor(
        private qmsService: QmsService
    ) { }

    Initialize(port_com: string) {
        this.qmsService.__x.Broadcast("/led/start", port_com);
    }

    private Command(cmd: string, addr: number) {
        console.log("led ", cmd, addr);
        this.qmsService.__x.Broadcast(
            "/led/command",
            `${cmd} ${addr}`
        );
    }

    private On(addr: number) {
        this.Command("on", addr);
    }

    private Off(addr: number) {
        this.Command("off", addr);
    }

    private Show(addr: number, text: string) {
        this.Command(`show ${text}`, addr);
    }

    Ping(addr: number) {
        this.Command("ping", addr);
    }

    private Stop(addr: number) {
        this.Command("stop", addr);
    }

    SendStatus(status: ILedStatus) {
        switch (status.cmd) {
            case LED_STATUS.WELCOME:
                this.On(status.addr);
                break;
            case LED_STATUS.STOP:
                this.Stop(status.addr);
                break;
            case LED_STATUS.SHOW:
                this.Show(status.addr, status.text);
                break;
        }
    }
}