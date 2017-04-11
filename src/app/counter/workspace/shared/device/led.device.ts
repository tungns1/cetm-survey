import { Injectable } from '@angular/core';
import { CounterDevice } from './counter.device';
import { QmsService } from './shared';

@Injectable()
export class LedDevice {
    constructor(
        private qmsService: QmsService
    ) { }

    Welcome() {
        this.qmsService.__x.Send("/led/welcome", null);
    }

    Stop() {
        this.qmsService.__x.Send("/led/stop");
    }

    Show(cnum: string) {
        this.qmsService.__x.Send("/led/show", { text: cnum });
    }

    Ping() { 
        this.qmsService.__x.Send("/led/ping");
    }
}