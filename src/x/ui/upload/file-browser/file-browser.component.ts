import { Component, Output, EventEmitter } from '@angular/core';
import { FileNode } from '../backend/';
import { FileUploadComponent } from './upload.component';

@Component({
    selector: 'file-browser',
    template: `
    <div>
        <file-tree [node]="node" (select)="view.open($event)"></file-tree>
        <folder-view #view (select)="choose($event)"></folder-view>
    </div>
    `,
    styles: [`
    folder-view {
        width: 80vw
    }`]
})
export class FileBrowserComponent {
    node = new FileNode("/upload/", "Upload");
    @Output() select = new EventEmitter<FileNode>();
    
    choose(node: FileNode) {
        this.select.next(node);
    }
}