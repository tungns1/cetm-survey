import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { ComposeService, WorkspaceService, WorkspaceSocket } from '../shared';
import { map } from 'rxjs/operators';

@Component({
    selector: 'workspace',
    templateUrl: 'workspace.component.html',
    styleUrls: ['workspace.component.scss']
})
export class WorkspaceComponent {
    constructor(
        private route: ActivatedRoute,
        private composeService: ComposeService,
        private socket: WorkspaceSocket
    ) { }

    message$ = this.socket.StatusMessage$.pipe(map(m => {
        if (m.startsWith("OPEN")) return "";
        return "NETWORK " + m;
    }));

    ngOnInit() {
        this.composeService.enable();
    }

    ngOnDestroy() {
        this.composeService.disable();
    }
} 