import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { WorkspaceService } from '../shared';

@Component({
    selector: 'workspace',
    templateUrl: 'workspace.component.html',
    styleUrls: ['workspace.component.scss']
})
export class WorkspaceComponent {
    constructor(
        private route: ActivatedRoute,
        private workspaceService: WorkspaceService,
        private media: ObservableMedia
    ) {

    }

    ngOnInit() {
        this.workspaceService.onInit();
    }

    ngOnDestroy() {
        this.workspaceService.onDestroy();
    }

    miniMode$ = this.media.asObservable().map(change => {
        console.log(change);
        return false;
    });
    counterName$ = this.workspaceService.currentCounter$.map(c => c.name);
} 