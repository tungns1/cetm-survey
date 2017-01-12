import { Component, OnInit, ViewChild } from '@angular/core';
import { Recall, Miss, CallFromWaiting, Finish, Remind, Skip } from '../backend/ticket';
import { Serving, Waiting, RxBusy, ITicket, autoNext, feedbackDone, ticketDialog } from '../backend/queue';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ModalComponent } from '../../x/ui/modal/';
import { TicketDetailDialog } from '../ticket/ticket-detail.dialog';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { PassFeedbackRequirement } from '../backend/';
import * as Status from '../backend/status';
import { Toast } from '../../x/ui/noti/toastr';

export const RxCanNext = combineLatest<ITicket[], ITicket[]>(Waiting.RxData, Serving.RxData)
    .filter(([waiting, serving]) => waiting.length > 0 && serving.length < 1);

@Component({
    selector: 'action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css'],
})
export class ActionComponent {
    auto = autoNext;
    fbs = feedbackDone;
    td = ticketDialog;
    action = '';
    username = '';
    pass = '';

    @ViewChild(TicketDetailDialog) dialog: TicketDetailDialog;
    @ViewChild(ModalComponent) needFeedback: ModalComponent;

    getTicket() {
        return Serving.first();
    }


    checkFinish() {
        if (PassFeedbackRequirement(this.getTicket())) {
            return true;
        }
        feedbackDone.next(false);
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
    Move() {
        this.action = 'move';
        if (this.getTicket() != null) {
            if (!this.checkFinish()) {
                return;
            } else {
                this.dialog.OpenMoveServing(this.getTicket());
                this.td.next(false);
            }
        }

    }
    onSubmit() {
        Skip(this.username, this.pass, this.getTicket().id).subscribe(v => {
            if (v) {
                this.needFeedback.Close();
                switch (this.action) {
                    case 'move':
                        this.dialog.OpenMoveServing(this.getTicket());
                        this.td.next(false);
                        break;
                    case 'next':
                        this.next();
                        break;
                    case 'finish':
                        this.finish();
                        break
                }

            } else {
                var toast = new Toast();
                toast.Title('Lỗi').Error('Tài khoản hoặc mật khẩu sai.').Show();
            }

        });
        this.pass = '';
    }

    Next() {
        this.action = 'next';
        if (!this.checkFinish()) {
            return;
        }
        this.next();

    }
    next() {
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
            setTimeout(_ => Status.Welcome(), 100);
            this.sub();
        }
    }

    NoNext() {
        this.auto.next(false);
        // stop
        Status.Stop();
    }

    Recall() {
        if (this.getTicket() != null) {
            Recall(this.getTicket()).subscribe(v => console.log(v));
        }

    }

    Finish() {
        this.action = 'finish';
        if (!this.checkFinish()) {
            return;
        }
        this.finish();
    }
    finish() {

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