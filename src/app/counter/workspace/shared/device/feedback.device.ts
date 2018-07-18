import { BehaviorSubject } from 'rxjs';
import { QmsService } from '../shared';
import { Injectable } from '@angular/core';
import { WorkspaceSettingService } from '../counter-setting.service';

@Injectable()
export class FeedbackDevice {
    constructor(
        private qmsService: QmsService,
        private counterSetting: WorkspaceSettingService
    ) {

    }

    enable() {
        this.UpdateConfig();
        this.qmsService.listen("/feedback/ready", (event: string, arg: any) => {
            this.UpdateConfig();
        });
        this.qmsService.listen("/feedback/screen-status", (status: 'on' | 'off') => {
            
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
