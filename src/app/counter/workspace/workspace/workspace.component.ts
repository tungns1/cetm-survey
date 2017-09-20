import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { ComposeService, WorkspaceService, WorkspaceSocket } from '../shared';

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
        private socket: WorkspaceSocket
    ) {

    }

    ngOnInit() {
        this.composeService.enable();
    }

    ngOnDestroy() {
        this.composeService.disable();
    }

    message$ = this.socket.StatusMessage$.map(m => {
        if (m.startsWith("OPEN")) return "";
        return "NETWORK " + m;
    });

    counterName$ = this.workspaceService.currentCounter$.map(c => c.name);
} 