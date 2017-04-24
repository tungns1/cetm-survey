import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { ComposeService, WorkspaceService } from '../shared';

@Component({
    selector: 'workspace',
    templateUrl: 'workspace.component.html',
    styleUrls: ['workspace.component.scss']
})
export class WorkspaceComponent {
    constructor(
        private route: ActivatedRoute,
        private workspaceService: WorkspaceService,
        private composeService: ComposeService,
        private media: ObservableMedia
    ) {

    }

    ngOnInit() {
        this.composeService.enable();
    }

    ngOnDestroy() {
        this.composeService.disable();
    }

    counterName$ = this.workspaceService.currentCounter$.map(c => c.name);
} 