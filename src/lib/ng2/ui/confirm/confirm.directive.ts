import {
  Component, Directive, Input, HostListener,
  Output, EventEmitter
} from '@angular/core';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {

  constructor(
    private mdDialog: MatDialog
  ) { }

  @Input() appConfirm: string;
  @Output() confirm = new EventEmitter();
  @HostListener("click", ["$event"])
  onClick(e: Event) {
    e.preventDefault();
    const config = new MatDialogConfig();
    config.width = '450px';
    const dialog = this.mdDialog.open(AppConfirmDialog, config)
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
  <div class="center margin-20-0" style="font-size: 13px">{{message}}</div>
  <div fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="center center" class="margin-20-0">
    <button fxFlex="20%" class="uppercase btnClear" (click)="dialogRef.close(true)" i18n="Confirm Yes">Yes</button>
    <button fxFlex="20%" class="uppercase btnFill" (click)="dialogRef.close(false)" i18n="Confirm No">No</button>
  </div>
  `
})
export class AppConfirmDialog {
  constructor(
    protected dialogRef: MatDialogRef<AppConfirmDialog>
  ) { }

  @Input() message: string;
}