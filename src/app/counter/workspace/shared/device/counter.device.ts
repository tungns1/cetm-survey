
import { Injectable } from '@angular/core';
import { QmsService } from '../shared';


class NoopLedDevice {
    Welcome() { }
    Stop() { }
    Show(cnum: string) { }
    Ping() { }
}


@Injectable()
export class CounterDevice {
    constructor(
        private qmsService: QmsService
    ) {
        this.onInit();
    }

    onInit() {
        try {
            this.native = this.qmsService.device("counter/index");
            this.led = this.native.GetLed();
            console.log("device is supported");
        } catch (e) {
            console.log("Fail to determine native", e);
        }
    }

    private native: any;
    private led = new NoopLedDevice();
}
