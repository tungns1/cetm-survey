import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from './service/';
import { CounterStateService } from '../shared';

@Component({
    selector: 'workspace',
    templateUrl: 'workspace.component.html'
})
export class CounterComponent {
    constructor(
        private route: ActivatedRoute,
        private stateService: CounterStateService,
        private workspaceService: WorkspaceService
    ) {

    }

    ngOnInit() {
        const p = this.stateService.Current;
        this.workspaceService.onInit(p.GetBranchAndCounter());
    }

    ngOnDestroy() {
        this.workspaceService.onDestroy();
    }

    counterName = this.workspaceService.currentCounter$.map(c => c.name);
} 