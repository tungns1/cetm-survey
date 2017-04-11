import {
  Component, Directive, Input, HostListener,
  Output, EventEmitter
} from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {

  constructor(
    private mdDialog: MdDialog
  ) { }

  @Input() appConfirm : string;
  @Output() confirm = new EventEmitter();
  @HostListener("click", ["$event"])
  onClick(e: Event) {
    e.preventDefault();
    const dialog = this.mdDialog.open(AppConfirmDialog)
    dialog.componentInstance.message = this.appConfirm || "Are you sure?";
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.confirm.next(true);
      }
    })
  }
}

@Component({
  selector: 'app-confirm-dialog',
  // <h1 md-dialog-title></h1>
  template: `
  <div md-dialog-content class="center">{{message}}</div>
  <div md-dialog-actions fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="center center" class="margin-t-20">
    <button fxFlex="20%" class="uppercase btnClear" (click)="dialogRef.close(true)">Yes</button>
    <button fxFlex="20%" class="uppercase btnFill" (click)="dialogRef.close(false)">No</button>
  </div>
  `
})
export class AppConfirmDialog {
  constructor(
    private dialogRef: MdDialogRef<AppConfirmDialog>
  ) { }

  @Input() message: string;
}