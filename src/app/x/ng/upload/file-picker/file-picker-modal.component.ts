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
        private dialog: MdDialogRef<FilePickerModalComponent>,
    ) { }

    value: string;

    ngOnInit() {
        this.value = this.dialogData.value;
    }

    close() {
        this.dialog.close(null);
    }

    choose(node: FileNode) {
        this.value = node.Path;
        this.dialog.close(this.value);
    }

}
