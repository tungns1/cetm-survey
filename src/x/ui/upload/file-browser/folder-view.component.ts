import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileNode } from '../backend/';


@Component({
    selector: 'folder-view',
    templateUrl: 'folder-view.component.html',

    styles: [
        `.active {
            background-color: green;
        }
        .btn-hlm {
	display: inline-block;
	color: #666;
	background-color: #eee;
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

.btn-view{
    font-size: 10px;
	padding: 2px 5px;
}

	.btn-hlm:hover {
		background-color: #e3e3e3;
		border-color: rgba(0,0,0,0.5);
	}
	
	.btn-hlm:active {
		background-color: #CCC;
		border-color: rgba(0,0,0,0.9);
	}

/* blue button */

.btn-upload {

    margin-top:15px;
	background: -webkit-gradient(linear, left top, left bottom, from(#cae285), to(#a3cd5a));
/*	background-color: #699DB6;*/
	border-color: rgba(0,0,0,0.3);
	text-shadow: 0 1px 0 rgba(0,0,0,0.5);
	color: #5d7731;
}

	.btn-upload:hover {
		background-color: #a3cd5a;
		border-color: rgba(0,0,0,0.5);
	}
	
	.btn-upload:active {
		background-color: #a3cd5a;
		border-color: rgba(0,0,0,0.9);
	}

    .btn-view {
	background-color: #0088cc;
	border-color: rgba(0,0,0,0.3);
	text-shadow: 0 1px 0 rgba(0,0,0,0.5);
	color: #FFF;
}

	.btn-view:hover {
		background-color: #0088cc;
		border-color: rgba(0,0,0,0.5);
	}
	
	.btn-view:active {
		background-color: #0088cc;
		border-color: rgba(0,0,0,0.9);
	}
    table {border-collapse: collapse;width:100%; }

th, td { padding: 0.5rem; }

tr {background: #e9e9e9; }

tr, td { transition: .4s ease-in; } 

tr:first-child {background: #2980b9; }

tr:nth-child(even) { background: #f6f6f6; }

td:empty {background: #e9e9e9; }
.div-scroll{
   
}
        `
    ]
})
export class FolderViewComponent {
    node: FileNode;

    open(node: FileNode) {
        this.node = node;
        console.log(this.node);
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

    private selected: FileNode;
    @Output() select = new EventEmitter<FileNode>();
}