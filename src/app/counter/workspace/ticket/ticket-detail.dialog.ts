import { Component, ViewChild, EventEmitter, OnInit, Optional, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Ticket, TicketStates } from '../shared';
import { TicketService, QueueService, WorkspaceService } from '../shared';

@Component({
  selector: 'ticket-detail-dialog',
  templateUrl: 'ticket-detail.dialog.html',
  styleUrls: ['ticket-detail.dialog.scss']
})
export class TicketDetailDialog {

  constructor(
    @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
    private dialog: MdDialog,
    private ticketService: TicketService,
    private queueService: QueueService,
    private workspaceService: WorkspaceService
  ) { }

  private ticket: Ticket = <any>{};

  private isServing = false;
  private canCall = false;

  private checkedCounters = [];
  private checkedServices = [];
  private counters = this.workspaceService.counters$.combineLatest(
    this.workspaceService.currentCounter$,
    (counters, currentCounter) => {
      return counters.filter(c => c.id !== currentCounter.id)
        .sort((a, b) => {
          if (a.name.length === b.name.length) {
            return a.name < b.name ? -1 : 1;
          }
          return a.name.length < b.name.length ? -1 : 1;
        });
    }
  );


  private services = this.workspaceService.services$;

  ngOnInit() {
    this.ticket = this.dialogData;
    this.canCall = this.ticket.priority.canMakeUnorderedCall() && this.ticket.state === "waiting";
  }

  Move() {
    if (this.isServing) {
      if (this.checkedCounters.length < 1 && this.checkedServices.length < 1) {
        this.ShowMessage("Unsuccess", "Please, select counter or service");
        return;
      }
    } else {
      if (this.checkedCounters.length < 1) {
        this.ShowMessage("Unsuccess", "Please, select counter");
        return;
      }
    }

    this.ticketService.Move(this.ticket, this.checkedServices, this.checkedCounters).subscribe(v => {
      this.dialog.closeAll();
    });
  }

  Recall() {
    this.queueService.busy$.first().subscribe(b => {
      if (b) {
        this.ShowMessage("Unsuccess", "Recall Miss");
        return;
      }
      this.ticketService.CallTicket(this.ticket).subscribe(v => {
        this.ticketService.SetAutoNext(false);
        this.dialog.closeAll();
      });
    });
  }

  confirmRemove() {
    const config = new MdDialogConfig();
    config.width = '450px';
    config.data = this.ticket;
    const dialog = this.dialog.open(ConfirmDialog, config);
  }

  protected ShowMessage(title: string, message: string) {
    const config = new MdDialogConfig();
    config.width = '450px';
    config.data = { title, message };
    const dialog = this.dialog.open(Alert, config);
  }

}

@Component({
  selector: 'confirm-dialog',
  template: `
        <p class="center" style="font-size: 13px" i18n="Confirm Delete">Do you want to delete the selected item?</p>
        <div fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="center center" class="margin-20-0">
            <button fxFlex="20%" class="uppercase btnClear" (click)="Delete()" i18n>Yes</button>
            <button fxFlex="20%" class="uppercase btnFill" md-dialog-close i18n>No</button>
        </div>
    `,
  styleUrls: ['ticket-detail.dialog.scss']
})
export class ConfirmDialog {

  constructor(
    private ticketService: TicketService,
    @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
    private dialog: MdDialog,
  ) { }


  Delete() {
    this.ticketService.Cancel(this.dialogData).subscribe(_ => {
      // toastr.success("Delete success counter");
      this.dialog.closeAll();
    }, err => {
    });
  }
}

@Component({
  selector: 'alert',
  template: `
        <h4 class="center margin-t-10" style="font-size: 14px; color: red;">{{title}}</h4>
        <p class="center margin-10" style="font-size: 13px">
            {{message}}
        </p>
        <div fxLayout="row" fxLayoutGap="20px" class="margin-20-35">
            <div fxFlex></div>
            <button fxFlex="30%" class="btnFill uppercase" md-dialog-close i18n>Yes</button>
        </div>
    `,
  styleUrls: ['ticket-detail.dialog.scss']
})
export class Alert {

  constructor(
    @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any
  ) { }

  title: string;
  message: string;

  ngOnInit() {
    this.title = this.dialogData.title;
    this.message = this.dialogData.message;
  }
}
