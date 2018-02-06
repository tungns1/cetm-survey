import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileNode } from '../backend/';


@Component({
    selector: 'folder-view',
    templateUrl: 'folder-view.component.html',
    styleUrls: ["folder-view.component.scss"]
})
export class FolderViewComponent {

    node: FileNode;
    private selected: FileNode;
    @Output() select = new EventEmitter<FileNode>();

    open(node: FileNode) {
        this.node = node;
        this.selected = null;
        node.Refresh().subscribe(_ => {

        })
    }

    focus(event: Event, node: FileNode) {
        event.preventDefault();
        event.stopPropagation();
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

    refresh() {
        this.node.Refresh().subscribe(_ => { })
    }

    removeFile(file: FileNode) {
        this.node.Remove(file['name']);
        setTimeout(() => {
            this.refresh();
        }, 200);
    }
}