
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
    .add-hlm{
      padding: 5px;
     background: -webkit-gradient(linear, left top, left bottom, from(#becbd6), to(#8da5b7));
    
    border-radius:5px; 
    margin: 5px;
    }
    
     .remove-hlm{
      padding: 5px;
      background: -webkit-gradient(linear, left top, left bottom, from(#d1d1d1), to(#afafaf));
    
    border-radius:5px; 
    margin: 5px;
    }
     .btn-hlm {
	display: inline-block;
	color: #666;
	background: -webkit-gradient(linear, left top, left bottom, from(#b7f2f4), to(#81e8eb));
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 12px;
	padding: 5px 10px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border: 1px solid rgba(0,0,0,0.3);
	border-bottom-width: 3px;
     }
    .btn-upload {
    margin-top:"15px";
	border-color: rgba(0,0,0,0.3);
	text-shadow: 0 1px 0 rgba(0,0,0,0.5);
	color: #FFF;
}

	.btn-upload:hover {
		background-color: #4F87A2;
		border-color: rgba(0,0,0,0.5);
	}
	
	.btn-upload:active {
		background-color: #3C677B;
		border-color: rgba(0,0,0,0.9);
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

