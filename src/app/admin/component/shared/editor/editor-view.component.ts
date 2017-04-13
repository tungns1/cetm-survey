import {
    Component, OnInit, Output, EventEmitter, Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { BaseAdminComponent } from './base.component'

@Component({
    selector: 'app-editor-view',
    templateUrl: 'editor-view.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorViewComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

    }

    @Input() title = 'title';

    @Output() action = new EventEmitter<string>();

    onAction(action: string) {
        // console.log('aa');
        this.action.next(action);
    }

    private GoBack() {
        this.router.navigate(['..', 'list'], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve'
        });
    }

    @Input() isNew = true;

}