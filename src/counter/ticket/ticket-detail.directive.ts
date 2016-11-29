import { Directive, ViewContainerRef } from '@angular/core';
import { Input, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
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

  // constructor(
  //   private viewContainer: ViewContainerRef,
  //   private componentFactoryResolver: ComponentFactoryResolver) { }

  open() {

    if (!this.ticket) {
      console.log("missing ticket for detail");
      return;
    }

    // this.createDialog();
    this.dialogRef.instance.ticket = this.ticket;
  }

  // createDialog() {
  //   this.viewContainer.clear();
  //   let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TicketDetailDialog);
  //   this.dialogRef = this.viewContainer.createComponent(dialogComponentFactory);
  //   this.dialogRef.instance.close.subscribe(() => {
  //     this.dialogRef.destroy();
  //   });
  // }
}
