import { Component, Input, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ["upload.component.css"]
})
export class FileUploadComponent {

  @ViewChild("fileInput") fileInputElement: ElementRef;
  @ViewChild("fileUpload") fileUploadElement: ElementRef;

  files: File[] = [];
  fileUploadClass: { dragover: boolean } = <any>{};

  // ngOnInit() {
  //   var el = <HTMLElement>this.fileUploadElement.nativeElement;
  //   el.addEventListener("dragover", e => {
  //     this.preventDefault(e);
  //     this.fileUploadClass.dragover = true;
  //   }, false);
  //   el.addEventListener("dragleave", e => {
  //     this.preventDefault(e);
  //     this.fileUploadClass.dragover = false;
  //   }, false);
  // }

  open() {
    this.openFileSelectView();
  }

  openFileSelectView() {
    this.fileInputElement.nativeElement.click();
  }

  onFileSelected(event: Event) {
    this.preventDefault(event);
    var fileInputElement = <HTMLInputElement>event.srcElement;
    this.addFileList(fileInputElement.files);
  }

  onFileDropped(event: DragEvent) {
    this.preventDefault(event);
    this.addFileList(event.dataTransfer.files);
    this.fileUploadClass.dragover = false;
  }

  private preventDefault(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private addFileList(files: FileList) {
    for (var i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
  }

}