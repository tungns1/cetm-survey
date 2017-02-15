import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketDetailDialog } from '../ticket/ticket-detail.dialog';
import {
    Ui, Ng,
    WorkspaceService, QueueService,
    LedService, TicketService
} from '../shared';

@Component({
    selector: 'action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.css'],
})
export class ActionComponent {
    constructor(
        private workspaceService: WorkspaceService,
        private queueService: QueueService,
        private ticketService: TicketService,
        private ledService: LedService
    ) { }

    auto = this.ticketService.autoNext$;
    fbs = this.workspaceService.feedbackDone$;
    action = '';
    username = '';
    pass = '';
    canNext$ = this.queueService.canNext$;

    @ViewChild(TicketDetailDialog) dialog: TicketDetailDialog;
    @ViewChild(Ng.ModalComponent) needFeedback: Ng.ModalComponent;

    canMove() {
        return this.action == 'move';
    }

    ngAfterViewInit() {
        this.dialog.close.subscribe(() => {
            this.action = '';
        })
    }

    checkFinish() {
        // if (PassFeedbackRequirement(this.CurrentTicket)) {
        return true;
        // }
        // feedbackDone.next(false);
        // this.needFeedback.Open();
        // return false;
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
        this.ticketService.serving$.subscribe(t => {
            if (t[0]) {
                this.dialog.SetTicket(t[0]);
            }
        });
    }

    onSubmit() {
        // Skip(this.username, this.pass, this.CurrentTicket.id).subscribe(v => {
        //     if (v) {
        //         this.needFeedback.Close();
        //         this.HandleAction();
        //     } else {
        //         var toast = new Ui.Notification.Toast();
        //         toast.Title('Lỗi').Error('Tài khoản hoặc mật khẩu sai.').Show();
        //     }
        // });
        // this.pass = '';
        this.HandleAction();
    }


    Next() {
        this.ticketService.FinishAll().subscribe(v => console.log(v));
        this.ticketService.SetAutoNext(true);
    }

    NoNext() {
        this.ticketService.SetAutoNext(false);
        this.ledService.ShowStop();
    }

    Recall() {
        this.ticketService.RecallAll().subscribe(v => console.log(v));

    }

    Finish() {
        // can finish
        this.ticketService.FinishAll().subscribe(v => console.log(v));
    }

    Miss() {
        this.ticketService.MissAll().subscribe(v => console.log(v));
    }

}