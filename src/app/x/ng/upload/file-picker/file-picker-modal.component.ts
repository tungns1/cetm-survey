import { Component, OnInit, Optional, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileNode, UploadURLToken } from '../backend/';

@Component({
    selector: '',
    templateUrl: 'file-picker-modal.component.html',
    styleUrls: ['file-picker-modal.component.scss']
})
export class FilePickerModalComponent implements OnInit {
   
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
        private dialog: MatDialogRef<FilePickerModalComponent>,
        @Inject(UploadURLToken) private baseUrl: string
    ) { }
    files: File[] = [];
    node = new FileNode(this.baseUrl, "/upload/", "Upload");
    selectedNode: FileNode
    value: string;
    selectedTab:number = 0;

    ngOnInit() {
        this.value = this.dialogData.value;
        this.selectedNode = this.node
    }

    close() {
        this.dialog.close(null);
    }

    choose(node: FileNode) {
        this.value = node.Path;
        this.dialog.close(this.value);
    }

    onTabChange(e) {
        this.selectedTab = e.index;
    }

}
