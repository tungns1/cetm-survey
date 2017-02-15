import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '../service/';

@Component({
    selector: 'app-counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CounterComponent {
    constructor(
        private route: ActivatedRoute,
        private workspaceService: WorkspaceService
    ) {

    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        const branch_code = params['branch_code'];
        const counter_code = params['counter_code'];
        this.workspaceService.onInit({ branch_code, counter_code });
    }

    ngOnDestroy() {

    }

    counterName = this.workspaceService.currentCounter$.map(c => c.name);
} 