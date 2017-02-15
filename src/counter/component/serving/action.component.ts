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
        return this.action == 'move' && this.CurrentTicket != null;
    }

    ngAfterViewInit() {
        this.dialog.close.subscribe(() => {
            this.action = '';
        })
    }

    get CurrentTicket() {
        return this.queueService.FirstServing();
    }

    checkFinish() {
        // if (PassFeedbackRequirement(this.CurrentTicket)) {
        return true;
        // }
        // feedbackDone.next(false);
        // this.needFeedback.Open();
        // return false;
    }

    sub() {
        this.canNext$.first().switchMap(s => {
            return this.auto.first()
        }).subscribe(can => {
            this.Next();
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
        let ticket = this.CurrentTicket;
        if (ticket) {
            this.ticketService.Finish(ticket).subscribe(v => console.log(v));
        }
        const firstWaiting = this.queueService.FirstWaiting();

        this.ticketService.SetAutoNext(true);
    }

    NoNext() {
        this.auto.next(false);
        // stop
        this.ledService.ShowStop();
    }

    Recall() {
        if (this.CurrentTicket != null) {
            this.ticketService.Recall(this.CurrentTicket).subscribe(v => console.log(v));
        }

    }

    Finish() {
        if (this.CurrentTicket != null) {
            // can finish
            this.ticketService.Finish(this.CurrentTicket).subscribe(v => console.log(v));
        }
    }

    Miss() {
        if (this.CurrentTicket != null) {
            this.ticketService.Miss(this.CurrentTicket).subscribe(v => console.log(v));
        }
    }

}