import { Component, Input, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { FileNode } from '../backend/';

@Component({
    selector: 'file-upload',
    templateUrl: 'upload.component.html',
    styleUrls: ["upload.component.scss"]
})
export class FileUploadComponent {

    @ViewChild("fileInput") fileInputElement: ElementRef;
    @Output() refreshAfterUpload: EventEmitter<any> = new EventEmitter<any>();
    @Output() select = new EventEmitter<FileNode>();
    files: File[] = [];

    open(node: FileNode) {
        this.node = node;
        this.fileInputElement.nativeElement.click();
    }


    onFileSelected(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        var fileInputElement = <HTMLInputElement>event.srcElement;
        this.addFileList(fileInputElement.files);
    }

    private addFileList(files: FileList) {
        for (var i = 0; i < files.length; i++) {
            this.files.push(files[i]);
        }
    }

    uploadDone(e) {
        if (e) {
            let a = this.node.addOneFile(e)
            this.refreshAfterUpload.emit(e)
            this.select.next(a);
        }
    }

    private node: FileNode;

}
