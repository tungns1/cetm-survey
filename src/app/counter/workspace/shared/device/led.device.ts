import { Injectable } from '@angular/core';
import { QmsService } from './shared';

@Injectable()
export class LedDevice {
    constructor(
        private qmsService: QmsService
    ) { }

    LedStart() {
        this.qmsService.__x.Broadcast("/led/start", "true");
    }

    Setup(addr: number) {
        this.qmsService.__x.Broadcast("/led/addr", addr);
    }

    private Command(name: string, addr: number) {
        console.log("led ", name, addr);
        this.qmsService.__x.Broadcast(
            "/led/command",
            `${name} ${addr}`
        );
    }

    Command_com(com: string) {
        this.qmsService.__x.Broadcast(
            "/led/com",
            `${com}`
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