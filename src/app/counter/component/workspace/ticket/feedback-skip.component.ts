import { Component, OnInit } from '@angular/core';
import { FeedbackService, TicketService } from '../service';
import { ITicket, Toast } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'feedback-skip',
    templateUrl: 'feedback-skip.component.html'
})
export class FeedbackSkipDialog {

    constructor(
        private feedbackService: FeedbackService,
        private ticketService: TicketService,
    ) { }

 
    ticket$ = this.feedbackService.promptForSkip$;
    hidden$ = this.ticket$.map(t => t.length < 1);

    username = '';
    pass = '';

    Submit() {
        const ticket = this.ticket$.value;
        const t = ticket[0];
        return this.ticketService.Skip(this.username, this.pass, t.id).do(v => {
            if (v) {
                this.feedbackService.SkipFeedback(t);
            } else {
                var toast = new Toast();
                toast.Title('Lỗi').Error('Tài khoản hoặc mật khẩu sai.').Show();
            }
        }).subscribe(_ => {
            this.pass = '';
        });
    }

    Cancel() {
        this.feedbackService.CancelSkipFeedback();
    }
}