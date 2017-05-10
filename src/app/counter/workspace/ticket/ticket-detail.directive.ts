import {
  Input, ComponentFactoryResolver, ComponentFactory,
  ComponentRef, Directive, ViewContainerRef
} from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { TicketDetailDialog } from './ticket-detail.dialog';

@Directive({
  selector: '[ticket-detail]',
  host: {
    "(click)": "open()"
  }
})
export class TicketDetailDirective {
  @Input('ticket-detail') ticket: any;
  private dialogRef: ComponentRef<TicketDetailDialog>;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private mdDialog: MdDialog
  ) { }

  open() {

    if (!this.ticket) {
      console.log("Missing ticket for detail");
      return;
    }
    
    const config = new MdDialogConfig();
    config.width = '350px';
    config.height = '400px';
    config.data = this.ticket;
    const dialog = this.mdDialog.open(TicketDetailDialog, config);
  }

  // createDialog() {
  //   this.viewContainer.clear();
  //   let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TicketDetailDialog);
  //   this.dialogRef = this.viewContainer.createComponent(dialogComponentFactory);
  //   this.dialogRef.instance.close.subscribe(() => {
  //     this.dialogRef.destroy();
  //   });
  //   return this.dialogRef;
  // }
}
