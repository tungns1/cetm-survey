import {
    Component, OnInit, Output, EventEmitter, Input
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheBranch } from '../../../service';
import { RuntimeEnvironment } from '../../../../shared';
// import { BaseAdminComponent } from './base.component'

@Component({
    selector: 'app-editor-view',
    templateUrl: 'editor-view.component.html'
})
export class EditorViewComponent implements OnInit {

    constructor(
        private env: RuntimeEnvironment,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.env.Auth.User$.subscribe(u => {
            this.adminRoot = CacheBranch.GetLevelForID(u.branch_id);
        });
    }

    @Input() isNew = true;
    @Input() isValid = true;
    @Input() title = 'title';
    @Input() canEdit = true;

    @Output() action = new EventEmitter<string>();
    branch_id = '';
    adminRoot = 0;
    hideActionBtn: boolean = false;

    ngOnInit() {
        if (!this.canEdit && this.adminRoot != 3) {
            this.hideActionBtn = true;
        }
    }

    onAction(action: string) {
        this.action.next(action);
    }

    importLayout() {
        document.getElementById('layoutImportBtn').click();
    }

    GoBack() {
        this.location.back();
    }

    getStyle() {
        if (!this.isValid) return 0.3;
    }
    
    getValid() {
        if (!this.isValid) return true;
        else return false;
    }
}