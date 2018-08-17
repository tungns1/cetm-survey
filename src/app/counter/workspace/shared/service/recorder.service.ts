import { Injectable } from '@angular/core';
import { SubscriptionLike as ISubscription ,  interval } from 'rxjs';
import { WorkspaceSettingService } from '../counter-setting.service';
import { RecorderDevice } from '../device';
import { QueueService } from './queue.service';
import { debounceTime } from 'rxjs/operators';


const UPLOAD_INTERVAL = 1 * 60 * 1000; // 1 minutes

@Injectable()
export class RecorderService {
    constructor(
        private queueService: QueueService,
        private recorderDevice: RecorderDevice,
        private counterSetting: WorkspaceSettingService
    ) { }

    enable() {
        this.recorderDevice.enable({
            format: 'mp3',
            upload_url: this.counterSetting.UploadUrl
        });
        const twoDigit = (d) => (d < 10 ? '0' : '') + d;
        this.subscription = this.queueService.serving$.pipe(debounceTime(250)).subscribe(s => {
            let t = s[0];
            if (t) {
                const date = new Date(t.mtime * 1000);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const dateString = `${date.getFullYear()}-${twoDigit(month)}-${twoDigit(day)}`;
                this.recorderDevice.AppendToFile(`${dateString}.${t.branch_id}.${t.transaction_id}`);
            } else {
                this.recorderDevice.SkipSaveToFile();
            }
        });
        this.queueService.missed$.pipe(debounceTime(250)).subscribe(s => {
            const ids = s.map(t => t.transaction_id);
            // console.log(ids);
            this.recorderDevice.RemoveFiles(ids);
        });
        interval(UPLOAD_INTERVAL).subscribe(_ => {
            this.uploadAll();
        });
        return true;
    }

    uploadAll() {
        this.recorderDevice.UploadAll();
    }

    disable() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.recorderDevice.disable();
    }

    private subscription: ISubscription;
}