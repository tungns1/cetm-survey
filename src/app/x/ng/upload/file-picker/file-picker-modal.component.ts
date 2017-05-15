import { Component, OnInit, Optional, Inject, HostListener } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FileNode } from '../backend/';

@Component({
    selector: '',
    templateUrl: 'file-picker-modal.component.html'
})
export class FilePickerModalComponent implements OnInit {

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
        private dialog: MdDialog,
    ) { }

    value: string;
    change;
    protected onChangeCallback = (v) => { };

    @HostListener("change") onChange() {
        this.onChangeCallback(this.value);
    }

    ngOnInit() {
        // console.log('aaaaaaaaaaaaa');
        // console.log(this.dialogData);
        this.value = this.dialogData.value;
        this.change = this.dialogData.change;
    }

    close() {
        this.dialog.closeAll();
    }

    choose(node: FileNode) {
        this.value = node.Path;
        this.onChange();
        this.change.next();
    }

}
