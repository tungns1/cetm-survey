import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QmsService } from '../shared';
import { Injectable } from '@angular/core';
import { CounterDevice } from './counter.device';
import { CounterSettingService } from './shared';

@Injectable()
export class FeedbackDevice {
    constructor(
        private qmsService: QmsService,
        private counterDevice: CounterDevice,
        private counterSetting: CounterSettingService
    ) {
        this.onInit();
    }

    onInit() {
        this.UpdateConfig();
        this.qmsService.listen("/feedback/ready", (event: string, arg: any) => {
            this.UpdateConfig();
        });
        this.qmsService.listen("/feedback/screen-status", (event: string, status: 'on' | 'off') => {
            this.status = status;
            console.log("feedback-status", status);
        });
        this.qmsService.__x.Broadcast("/feedback/query-screen-status", null);
    }

    UpdateConfig() {
        this.qmsService.__x.Broadcast("/feedback/update-config", this.counterSetting.Data);
    }

    get Available() {
        return this.status === 'on';
    }

    private status: 'on' | 'off' = 'off';
}
