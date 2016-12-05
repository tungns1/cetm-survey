import { Component, OnInit } from '@angular/core';
import { Recall, Miss, CallFromWaiting, Finish, Remind } from '../backend/ticket';
import { RxCanNext, Serving, Waiting } from '../backend/queue';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config, Recorder } from '../recorder/recorder.component';

@Component({

    selector: 'action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css'],
})

// let config: Config = {
//     encoderPath: "encoderWorker.min.js"
// }
// let recorder: Recorder = new Recorder(config);

export class ActionComponent {
    config: Config = {};
    recorder: Recorder = new Recorder(this.config);
    getTicket() {
        return Serving.first();
    }

    sub() {
        RxCanNext.first().subscribe(can => {
            if (this.autoNext.value) {
                this.Next();
            }
        })
    }

    Next() {
        let ticket = this.getTicket();
        if (ticket) {
            // finish
            this.recorder.stop()
            Finish(ticket).subscribe(v => console.log(v));
        }
        let firstTicket = Waiting.first();
        if (firstTicket) {
            CallFromWaiting(firstTicket).subscribe(v => {
                // start 
                this.recorder.start(firstTicket.id)
                this.autoNext.next(false);
            });
        } else {
            this.autoNext.next(true);
            this.sub();
        }
    }

    NoNext() {
        this.autoNext.next(false);
    }

    Recall() {
        Recall(this.getTicket()).subscribe(v => console.log(v));
    }

    Finish() {
        // finish
        this.recorder.stop()
        Finish(this.getTicket()).subscribe(v => console.log(v));

    }

    Miss() {
        Miss(this.getTicket()).subscribe(v => console.log(v));
    }

    Reminder() {
        Remind(this.getTicket()).subscribe(v => console.log(v));
    }

    autoNext = new BehaviorSubject<boolean>(false);
}