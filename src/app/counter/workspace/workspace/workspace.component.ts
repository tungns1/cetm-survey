import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '../shared';

@Component({
    selector: 'workspace',
    templateUrl: 'workspace.component.html',
    styleUrls: ['workspace.component.scss']
})
export class WorkspaceComponent {
    constructor(
        private route: ActivatedRoute,
        private workspaceService: WorkspaceService
    ) {

    }

    ngOnInit() {
        this.workspaceService.onInit();
    }

    ngOnDestroy() {
        this.workspaceService.onDestroy();
    }

    counterName$ = this.workspaceService.currentCounter$.map(c => c.name);
} 