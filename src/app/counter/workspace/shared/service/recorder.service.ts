import { Injectable } from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import { RecorderDevice } from '../device';
import { QueueService } from './queue.service';

@Injectable()
export class RecorderService {
    constructor(
        private queueService: QueueService,
        private recorderDevice: RecorderDevice
    ) { }

    enable() {
        this.subscription = this.queueService.serving$.subscribe(s => {
            let t = s[0];
            if (t) {
                this.recorderDevice.AppendToFile(t.id);
            } else {
                this.recorderDevice.Stop();
            }
        })
    }

    disable() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private subscription: ISubscription;
}