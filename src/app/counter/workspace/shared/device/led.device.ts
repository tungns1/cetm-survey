import { Injectable } from '@angular/core';
import { QmsService } from './shared';

@Injectable()
export class LedDevice {
    constructor(
        private qmsService: QmsService
    ) { }

    Initialize(port_com:string) {
        this.qmsService.__x.Broadcast("/led/start", port_com);
    }

    private Command(cmd: string, addr: number) {
        console.log("led ", cmd, addr);
        this.qmsService.__x.Broadcast(
            "/led/command",
            `${cmd} ${addr}`
        );
    }

    On(addr: number) {
        this.Command("on", addr);
    }

    Off(addr: number) {
        this.Command("off", addr);
    }

    Show(addr: number, text: string) {
        this.Command(`show ${text}`, addr);
    }

    Ping(addr: number) {
        this.Command("ping", addr);
    }

    Stop(addr: number) {
        this.Command("stop", addr);
    }
}