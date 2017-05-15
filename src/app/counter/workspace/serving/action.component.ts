import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { TicketDetailDialog } from '../ticket';
import { ModalComponent } from '../shared';
import { RecorderDevice } from '../shared/device/recorder.device';

import {
    WorkspaceService, QueueService,
    LedService, TicketService
} from '../shared';

@Component({
    selector: 'action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.scss'],
})
export class ActionComponent {
    constructor(
        private workspaceService: WorkspaceService,
        private queueService: QueueService,
        private ticketService: TicketService,
        private ledService: LedService,
        private mdDialog: MdDialog,
        private recorderDevice:  RecorderDevice
    ) { }

    auto = this.ticketService.autoNext$;

    canNext$ = this.queueService.canNext$;

    @ViewChild(TicketDetailDialog) dialog: TicketDetailDialog;
    @ViewChild(ModalComponent) needFeedback: ModalComponent;

    Move() {
        this.ticketService.CheckFeedbackDone().subscribe(t => {
            if (t && t.length > 0) {
                const config = new MdDialogConfig();
                config.width = '350px';
                config.data = t[0];
                const dialog = this.mdDialog.open(TicketDetailDialog, config);
            }
        });
    }

    Next() {
        console.log("next");
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
        this.ticketService.MissAll().subscribe(v => {
            console.log(v);
            this.recorderDevice.SendFileMiss();
        });
    }

}