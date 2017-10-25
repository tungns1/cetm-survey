import {
  Input, ComponentFactoryResolver, ComponentFactory,
  ComponentRef, Directive, ViewContainerRef
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TicketDetailDialog } from './ticket-detail.dialog';

@Directive({
  selector: '[ticket-detail]',
  host: {
    "(click)": "open()"
  }
})
export class TicketDetailDirective {
  @Input('ticket-detail') ticket: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private mdDialog: MatDialog
  ) { }

  open() {
    if (!this.ticket) {
      console.log("Missing ticket for detail");
      return;
    }
    
    const config = new MatDialogConfig();
    config.width = '450px';
    config.data = this.ticket;
    const dialog = this.mdDialog.open(TicketDetailDialog, config);
  }
}
