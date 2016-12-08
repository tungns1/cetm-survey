
import { Component, EventEmitter, ElementRef, Input, Output } from '@angular/core';
import { FileNode } from '../backend/';

@Component({
  selector: 'file-tree',
  templateUrl: 'file-tree.component.html',
  styles: [`
    ul.tree-view {
      list-style-type: none;
    }
    .node-name {
      
    }
  `]
})

export class FileTreeComponent {

  @Output() select = new EventEmitter<FileNode>();
  @Input() node: FileNode;

  choose() {
    this.select.next(this.node);
  }

}

