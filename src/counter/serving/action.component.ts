import { Component, OnInit, ViewChild } from '@angular/core';
import { Recall, Miss, CallFromWaiting, Finish, Remind } from '../backend/ticket';
import { Serving, Waiting, RxBusy, ITicket, autoNext } from '../backend/queue';

import { ModalComponent } from '../../x/ui/modal/';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Config } from '../backend/';

export const RxCanNext = combineLatest<ITicket[], ITicket[]>(Waiting.RxData, Serving.RxData)
    .filter(([waiting, serving]) => waiting.length > 0 && serving.length < 1);

@Component({
    selector: 'action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css'],
})
export class ActionComponent {
    auto = autoNext;

    @ViewChild(ModalComponent) needFeedback: ModalComponent;

    getTicket() {
        return Serving.first();
    }

    checkFinish() {
        if (!Config.Feedback.required) {
            return true;
        }
        const ticket = this.getTicket();
        if (!ticket) {
            return true;
        }
        const tracks = ticket.tracks;
        const t = tracks[tracks.length - 1];
        const f = t.feedback;
        if (f && f.rating) {
            return true;
        }
        this.needFeedback.Open();
        return false;
    }

    sub() {
        RxCanNext.first().subscribe(can => {
            if (this.auto.value) {
                this.Next();
            }
        })
    }

    Next() {
        if (!this.checkFinish()) {
            return;
        }
        let ticket = this.getTicket();
        if (ticket) {
            Finish(ticket).subscribe(v => console.log(v));
        }
        let firstTicket = Waiting.first();
        if (firstTicket) {
            CallFromWaiting(firstTicket).subscribe(v => {
                this.auto.next(false);
            }, e => {
                console.log(e);
                this.sub();
            });
        } else {
            this.auto.next(true);
            this.sub();
        }
    }

    NoNext() {
        this.auto.next(false);
    }

    Recall() {
        if (this.getTicket() != null) {
            Recall(this.getTicket()).subscribe(v => console.log(v));
        }

    }

    Finish() {
        if (!this.checkFinish()) {
            return;
        }

        if (this.getTicket() != null) {
            // can finish
            Finish(this.getTicket()).subscribe(v => console.log(v));
        }
    }

    Miss() {
        if (this.getTicket() != null) {
            Miss(this.getTicket()).subscribe(v => console.log(v));
        }
    }

}