import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FeedbackService, TicketService } from '../shared';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ITicket,Ticket } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'feedback-skip',
    templateUrl: 'feedback-skip.component.html'
})
export class FeedbackSkipDialog {

    constructor(
         @Optional() @Inject(MD_DIALOG_DATA) public ticket: Ticket,
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
        // return this.ticketService.Skip(this.username, this.pass, t.id).do(v => {
        //     if (v) {
        //         this.feedbackService.SkipFeedback(t);
        //     } else {
        //         console.error('Tài khoản hoặc mật khẩu sai.');
        //     }
        // }).subscribe(_ => {
        //     this.pass = '';
        // });
    }

    Cancel() {
        this.feedbackService.CancelSkipFeedback();
    }
}