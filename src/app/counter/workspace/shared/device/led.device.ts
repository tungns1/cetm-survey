import { Injectable } from '@angular/core';
import { QmsService } from './shared';

@Injectable()
export class LedDevice {
    constructor(
        private qmsService: QmsService
    ) { }

    Setup(addr: number) {
        this.qmsService.__x.Broadcast("/led/com", addr);
    }

    private Command(name: string, addr: number) {
        this.qmsService.__x.Broadcast(
            "/led/command",
            `${name} ${addr}`
        );
    }

    On(addr: number) {
        this.Command("on", addr);
    }

    Off(addr: number) {
        this.Command("off", addr);
    }

    Show(addr: number, text: string) {
        this.Command(`on ${text}`, addr);
    }

    Ping(addr: number) {
        this.Command("ping", addr);
    }
}