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
    action = '';
    username = '';
    pass = '';

    @ViewChild(TicketDetailDialog) dialog: TicketDetailDialog;
    @ViewChild(ModalComponent) needFeedback: ModalComponent;

    canMove() {
        return this.action == 'move' && this.CurrentTicket != null;
    }

    ngAfterViewInit() {
        this.dialog.close.subscribe(() => {
            this.action = '';
        })
    }

    get CurrentTicket() {
        return Serving.first();
    }

    checkFinish() {
        if (PassFeedbackRequirement(this.CurrentTicket)) {
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

    SetAction(action: string) {
        this.action = action;
        if (!this.checkFinish()) {
            return;
        }
        this.HandleAction();
    }

    HandleAction() {
        switch (this.action) {
            case 'move':
                this.Move();
                break;
            case 'finish':
                this.Finish();
                break;
            case 'next':
                this.Next();
                break;
        }
    }

    Move() {
        if (this.CurrentTicket) {
            this.dialog.SetTicket(this.CurrentTicket);
        }
    }

    onSubmit() {
        Skip(this.username, this.pass, this.CurrentTicket.id).subscribe(v => {
            if (v) {
                this.needFeedback.Close();
                this.HandleAction();
            } else {
                var toast = new Toast();
                toast.Title('Lỗi').Error('Tài khoản hoặc mật khẩu sai.').Show();
            }
        });
        this.pass = '';
    }


    Next() {
        let ticket = this.CurrentTicket;
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
        if (this.CurrentTicket != null) {
            Recall(this.CurrentTicket).subscribe(v => console.log(v));
        }

    }

    Finish() {
        if (this.CurrentTicket != null) {
            // can finish
            Finish(this.CurrentTicket).subscribe(v => console.log(v));
        }
    }

    Miss() {
        if (this.CurrentTicket != null) {
            Miss(this.CurrentTicket).subscribe(v => console.log(v));
        }
    }

}