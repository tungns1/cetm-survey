import { Injectable } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { CounterSettingService } from './shared';
import { RecorderDevice } from '../device';
import { QueueService } from './queue.service';

@Injectable()
export class RecorderService {
    constructor(
        private queueService: QueueService,
        private recorderDevice: RecorderDevice,
        private counterSetting: CounterSettingService
    ) { }

    enable() {
        this.recorderDevice.enable({
            format: 'mp3',
            upload_url: this.counterSetting.UploadUrl
        });
        this.subscription = this.queueService.serving$.subscribe(s => {
            let t = s[0];
            if (t) {
                const date = new Date(t.mtime * 1000);
                const dateString = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
                this.recorderDevice.AppendToFile(`${dateString}.${t.branch_id}.${t.transaction_id}`);
            } else {
                this.recorderDevice.SkipSaveToFile();
            }
        });
        return true;
    }

    disable() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.recorderDevice.disable();
    }

    private subscription: ISubscription;
}