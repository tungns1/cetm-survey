import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { FileNode, FileItem } from '../backend/';

@Component({
  selector: 'tr[upload-item]',
  template: `
      <td>{{item.Name}} </td> 
      <td> {{item.Size}} </td>
      <td> {{progress | async}} % </td>
  `,
  styles: [`
      td{
        border: 1px solid #e6e6e6;
        text-align: left;
        padding: 5px;
      }
      md-progress-circle{
        width:50px;
        height:50px;
      }
      
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  private item: FileItem;

  @Input("upload-item") set file(value: File) {
    this.item = new FileItem(value);
    // this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.item.MakeObjectUrl());
  };

  // safeUrl: SafeUrl;
  private progress: Observable<number>;

  constructor(private sanitizer: DomSanitizer) {

  }

  public upload(node: FileNode) {
    this.progress = node.Create(this.item.File, this.item.Name).map(v => Math.round(v * 100));
  }
}