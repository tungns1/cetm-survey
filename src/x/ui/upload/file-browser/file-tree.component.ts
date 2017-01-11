
import { Component, EventEmitter, ElementRef, Input, Output } from '@angular/core';
import { FileNode } from '../backend/';

@Component({
  selector: 'file-tree',
  templateUrl: 'file-tree.component.html',
   styleUrls: ["file-tree.component.css"]
})

export class FileTreeComponent {

  @Output() select = new EventEmitter<FileNode>();
  @Input() node: FileNode;

  choose(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.select.next(this.node);
  }


}

