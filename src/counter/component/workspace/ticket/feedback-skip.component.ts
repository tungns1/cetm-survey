import { Component, OnInit } from '@angular/core';
import { FeedbackService, TicketService } from '../service';
import { ITicket, Ui } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'feedback-skip',
    templateUrl: 'feedback-skip.component.html'
})
export class FeedbackSkipDialog implements OnInit {

    constructor(
        private feedbackService: FeedbackService,
        private ticketService: TicketService,
    ) { }

    ngOnInit() {
        this.ticket$.subscribe(t => this.hidden$.next(!t));
    }

    ticket$ = this.feedbackService.promptForSkip$;
    hidden$ = new BehaviorSubject(false);

    username = '';
    pass = '';

    Submit() {
        this.ticket$.switchMap(t => {
            return this.ticketService.Skip(this.username, this.pass, t.id).do(v => {
                if (v) {
                    this.feedbackService.SkipFeedback(t);
                } else {
                    var toast = new Ui.Notification.Toast();
                    toast.Title('Lỗi').Error('Tài khoản hoặc mật khẩu sai.').Show();
                }
            });
        }).subscribe(_ => {
            this.pass = '';
        });
    }

    Close() {
        this.hidden$.next(true);
    }
}