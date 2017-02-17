import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketDetailDialog } from '../ticket/ticket-detail.dialog';
import { Ui, Ng } from '../../shared';

import {
    WorkspaceService, QueueService,
    LedService, TicketService
} from '../service';

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
    moveDialog = false;

    canNext$ = this.queueService.canNext$;

    @ViewChild(TicketDetailDialog) dialog: TicketDetailDialog;
    @ViewChild(Ng.ModalComponent) needFeedback: Ng.ModalComponent;


    ngAfterViewInit() {
        this.dialog.close.subscribe(() => {
            this.moveDialog = false;
        })
    }

    Move() {
        this.ticketService.CheckFeedbackDone().subscribe(t => {
            if (t) {
                this.moveDialog = true;
                this.dialog.SetTicket(t[0]);
            }
        });
    }

    Next() {
        this.ticketService.CheckFeedbackAndFinishAll().subscribe(done => {
            this.ticketService.SetAutoNext(done);
        });
    }

    NoNext() {
        this.ticketService.SetAutoNext(false);
    }

    Recall() {
        this.ticketService.RecallAll().subscribe(v => console.log(v));
    }

    Finish() {
        // can finish
        this.ticketService.CheckFeedbackAndFinishAll().subscribe(v => console.log(v));
    }

    Miss() {
        this.ticketService.MissAll().subscribe(v => console.log(v));
    }

}