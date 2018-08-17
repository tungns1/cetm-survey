import { Component, Inject, ViewChild, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ticket, WorkspaceService, TicketService, NoticeComponent, ServiceName } from '../../shared';
import { ShowLoading, HideLoading } from '../../../../../lib/backend';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-service-dialog',
    templateUrl: './add-service-dialog.component.html',
    styleUrls: ['./add-service-dialog.component.scss']
})
export class AddServiceDialogComponent {

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public ticket: Ticket,
        private workspaceService: WorkspaceService,
        private dialogRef: MatDialogRef<AddServiceDialogComponent>,
        private ticketService: TicketService,
    ) { }
    services = [];
    checkedServices = [];
    @ViewChild(NoticeComponent) notice: NoticeComponent;
    private subscription: Subscription;

    ngOnInit() {
        this.subscription = this.workspaceService.currentCounter$.subscribe(v => {
            this.services = v.services.map(item => {
                return Object.assign({
                    id: item,
                    name: ServiceName(item)
                })
            })
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    close() {
        this.dialogRef.close();
    }

    AddService() {
        if (this.checkedServices.length < 1) {
            this.notice.ShowMessage("missing_service");
            return;
        } else {
            this.close()
            this.ticketService.Move(this.ticket, this.checkedServices, []).subscribe(v => {
                ShowLoading();
                this.ticketService.TriggerAction('call', this.ticket).subscribe(v => {
                    HideLoading();
                })
            })

        }
    }
}
