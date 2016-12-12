import { Component, OnInit } from '@angular/core';
import { Recall, Miss, CallFromWaiting, Finish, Remind } from '../backend/ticket';
import { RxCanNext, Serving, Waiting, RxBusy } from '../backend/queue';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css'],
})

export class ActionComponent {
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
            Finish(ticket).subscribe(v => console.log(v));
        }
        let firstTicket = Waiting.first();
        if (firstTicket) {
            CallFromWaiting(firstTicket).subscribe(v => {
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
        if (this.getTicket() != null) {
            Recall(this.getTicket()).subscribe(v => console.log(v));
        }

    }

    Finish() {
        if (this.getTicket() != null) {
            Finish(this.getTicket()).subscribe(v => console.log(v));
        }

    }

    Miss() {
        if (this.getTicket() != null) {
            Miss(this.getTicket()).subscribe(v => console.log(v));
        }
    }

    Reminder() {
        if (this.getTicket() != null) {
            Remind(this.getTicket()).subscribe(v => console.log(v));
        }
    }

    autoNext = new BehaviorSubject<boolean>(false);
}