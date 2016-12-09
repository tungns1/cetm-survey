import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileNode } from '../backend/';


@Component({
    selector: 'folder-view',
    templateUrl: 'folder-view.component.html',
    styles: [
        `.active {
            background-color: green;
        }`
    ]
})
export class FolderViewComponent {
    node: FileNode;

    open(node: FileNode) {
        this.node = node;
        this.selected = null;
        node.Refresh().subscribe(_ => {

        })
    }

    focus(node: FileNode) {
        if (node.is_dir) {
            this.open(node);
            return;
        }
        this.selected = node;
        this.select.next(this.selected);
    }

    view(file: FileNode) {
        window.open(file.URL, "_blank");
    }
        
    private selected: FileNode;
    @Output() select = new EventEmitter<FileNode>();
}