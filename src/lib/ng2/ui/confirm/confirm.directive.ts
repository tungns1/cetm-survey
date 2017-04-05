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
  template: `
  <h1 md-dialog-title></h1>
  <div md-dialog-content>{{message}}</div>
  <div md-dialog-actions>
    <button md-button (click)="dialogRef.close(true)">Yes</button>
    <button md-button (click)="dialogRef.close(false)">No</button>
  </div>
  `
})
export class AppConfirmDialog {
  constructor(
    private dialogRef: MdDialogRef<AppConfirmDialog>
  ) { }

  @Input() message: string;
}