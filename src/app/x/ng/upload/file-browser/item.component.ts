import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FileNode, FileItem } from '../backend/';
import { map } from 'rxjs/operators';

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
    item: FileItem;

    @Input() set data(value: { node: FileNode, file: File }) {
        this.item = new FileItem(value.file);
        this.upload(value.node);
        // this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.item.MakeObjectUrl());
    };
    @Output() uploadProgress: EventEmitter<any> = new EventEmitter<any>();
    // safeUrl: SafeUrl;
    progress: Observable<number>;
    ngOnInit() {

    }

    public upload(node: FileNode) {
        this.progress = node.Create(this.item.File, this.item.Name).pipe(map(v => Math.round(v * 100)));
        let ctf = this.progress.subscribe(v => {
            if (v === 100) {
                this.uploadProgress.emit(this.item)
                ctf.unsubscribe()
            }
        })
    }
}