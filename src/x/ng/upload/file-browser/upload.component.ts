import { Component, Input, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { FileNode } from '../backend/';

@Component({
  selector: 'file-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ["upload.component.css"]
})
export class FileUploadComponent {

  @ViewChild("fileInput") fileInputElement: ElementRef;

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

  private node: FileNode;

}