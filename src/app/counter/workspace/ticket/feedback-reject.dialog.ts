import { Component, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ticket } from '../shared';

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


  private ticket: Ticket = this.dialogData;

  isSentReason: boolean = false;
  textReason: string = ''

  sentReason() {
    // if (this.ticket.tracks[this.ticket.tracks.length - 1].feedback) {
    //   this.ticket.tracks[this.ticket.tracks.length - 1].feedback.reason_text = this.textReason;
    // } else {
    this.ticket.tracks[this.ticket.tracks.length - 1].feedback = { reason_text: this.textReason }
    // }
    this.dialogRef.close(this.ticket);
  }
  isText: boolean = false
  changeText(e) {
    console.log(e)
    if (e !== '' || e !== null) {
      this.isText = true
    } else {
      this.isText = false
    }
  }
  close() {
    this.dialogRef.close(null);
  }
}
