
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

  choose(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.select.next(this.node);
  }
  

}

