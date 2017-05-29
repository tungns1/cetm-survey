import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FileNode, UploadURLToken } from '../backend/';
import { FileUploadComponent } from './upload.component';

@Component({
    selector: 'file-browser',
    template: `
        <file-tree [node]="node" (select)="view.open($event)"></file-tree>
        <div class="divider"></div>
        <folder-view #view (select)="choose($event)"></folder-view>
    `,
})
export class FileBrowserComponent {
    constructor(
        @Inject(UploadURLToken) private baseUrl: string
    ) { }

    node = new FileNode(this.baseUrl, "/upload/", "Upload");
    @Output() select = new EventEmitter<FileNode>();

    choose(node: FileNode) {
        this.select.next(node);
    }
}