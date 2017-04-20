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
        console.log(this.isValid);
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

    private getStyle() {
        if(!this.isValid) return 0.3;
    }
    private getValid() {
        if(!this.isValid) return true;
        else return false;
    }

    @Input() isNew   = true;
    @Input() isValid = true;
}