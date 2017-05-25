import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { FileNode, FileItem } from '../backend/';

@Component({
  selector: 'div[upload-item]',
  template: `
    <div fxLayout="row">
      <span fxFlex>{{item.Name}}</span> 
      <span fxFlex>{{item.Size}}</span>
      <span fxFlex>{{progress | async}} %</span>
    </div>
  `,
  styles: [`
      span{
        padding: 5px 0;
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

  @Input() set data(value: { node: FileNode, file: File }) {
    this.item = new FileItem(value.file);
    this.upload(value.node);
    // this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.item.MakeObjectUrl());
  };

  // safeUrl: SafeUrl;
  private progress: Observable<number>;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

  }

  public upload(node: FileNode) {
    this.progress = node.Create(this.item.File, this.item.Name).map(v => Math.round(v * 100));
  }
}