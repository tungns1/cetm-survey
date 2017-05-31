import {
    Component, OnInit, Output, EventEmitter, Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { BaseAdminComponent } from './base.component'

@Component({
    selector: 'app-editor-view',
    templateUrl: 'editor-view.component.html'
})
export class EditorViewComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    @Input() isNew   = true;
    @Input() isValid = true;
    @Input() title = 'title';

    @Output() action = new EventEmitter<string>();

    ngOnInit() {

    }

    onAction(action: string) {
        this.action.next(action);
    }

    private GoBack() {
        this.router.navigate(['..', 'list'], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve'
        });
    }

    private getStyle() {
        if(!this.isValid) return 0.3;
    }
    private getValid() {
        if(!this.isValid) return true;
        else return false;
    }
}