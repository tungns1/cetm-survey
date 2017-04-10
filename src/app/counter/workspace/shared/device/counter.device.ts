
import { Injectable } from '@angular/core';
import { QmsService } from '../shared';

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
            console.log("device is supported");
        } catch (e) {
            console.log("Fail to determine native", e);
        }
    }

    private native: any;

    GetFeedbackWindow() {
        const link = "http://localhost:4201/#/feedback";
        if (this.native) {
            this.native.GetFeedbackWindow(link, this.qmsService.__x);
        }
    }

    GetLed() {
        return this.native.GetLed();
    }
}
