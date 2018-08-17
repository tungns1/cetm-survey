import { Component, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ticket } from '../shared';
import { TranslateService } from '../../../shared/util';

@Component({
    selector: 'feedback-reject-dialog',
    templateUrl: 'feedback-reject.dialog.html',
    styleUrls: ['ticket-detail.dialog.scss']
})
export class FeedbackRejectlDialog {

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: Ticket,
        private dialogRef: MatDialogRef<FeedbackRejectlDialog>,
    ) { }

    protected translateService = new TranslateService

    private ticket: Ticket = this.dialogData;

    isSentReason: boolean = false;
    textReason: string = ''
    reasons = [
        { id: 0, name: this.translateService.translate('Khách hàng về trước') },
        { id: 1, name: this.translateService.translate('Khách hàng không đồng ý phản hồi') },
        { id: 2, name: this.translateService.translate('Lý do khác') }
    ];
    checkedReason
    allowSubmit: boolean = false
    validateSubmit() {
        if(this.checkedReason){

            let id = this.checkedReason.toString();
            switch(id){
                case '0':
                case '1':
                    this.allowSubmit = true;
                    break;
                case '2':
                    this.allowSubmit = false;
                    if(this.textReason){
                        this.allowSubmit = true;
                    }
                    break;
                default:
                    this.allowSubmit = false;
                    break;
            }
        }
    }
    sentReason() {
        let reason = this.reasons[this.checkedReason].name;
        if (this.checkedReason != 2) {
            this.textReason = reason;
        }
        this.ticket.tracks[this.ticket.tracks.length - 1].feedback = { reason_text: this.textReason }
        this.dialogRef.close(this.ticket);
    }
    isText: boolean = false
    changeText(e) {
        if (e) {
            this.allowSubmit = true;
            this.textReason = e
        } else {
            this.allowSubmit = false;
        }
    }
    close() {
        this.dialogRef.close(null);
    }
}
