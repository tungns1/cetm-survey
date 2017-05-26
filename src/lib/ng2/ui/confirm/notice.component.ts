import { Component, Input, Optional, Inject, ElementRef } from '@angular/core';
import { ContentChildren, QueryList } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "app-notice-message",
    template: ` `
})
export class NoticeMessageComonent {
    
    @Input() name: string;
    @Input() message: string;
    
    GetMessage() {
        return this.message || this.name;
    }
}

@Component({
    selector: "app-notice-dialog",
    template: `
        <p class="center margin-10" style="font-size: 13px">
            {{message}}
        </p>
        <div fxLayout="row" fxLayoutGap="20px" class="margin-20-35">
            <div fxFlex></div>
            <button fxFlex="30%" class="btnFill uppercase" md-dialog-close i18n>Close</button>
        </div>`
})
export class NoticeDialogComponent {
    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) public message: string,
        protected dialogRef: MdDialogRef<NoticeDialogComponent>
    ) { }
}

@Component({
    selector: 'app-notice',
    template: `<ng-content></ng-content>`
})
export class NoticeComponent {
    constructor(
        private mdDialog: MdDialog
    ) { }

    @ContentChildren(NoticeMessageComonent) private children: QueryList<NoticeMessageComonent>;

    ngOnInit() {

    }

    private name = "";

    ShowMessage(name: string) {
        if (name == this.name) return;
        this.name = name;
        setTimeout(() => this.show());
    }

    Close() {
        this.dialogRef.close();
    }

    private show() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }

        const message = this.getMessage(this.name);
        if (message) {
            const config = new MdDialogConfig();
            config.width = '400px';
            config.data = message;
            this.dialogRef = this.mdDialog.open(NoticeDialogComponent, config);
            this.dialogRef.afterClosed().subscribe(_ => {
                this.dialogRef = null;
                this.name = "";
            });
        }
    }

    private getMessage(name: string) {
        if (!this.children) return "";
        const v = this.children.find(c => c.name === name);
        return v ? v.GetMessage() : "";
    }

    private dialogRef: MdDialogRef<NoticeDialogComponent>;
}

