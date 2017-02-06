import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxSummary } from './summary.model';
import * as Service from './summary.service';

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html'
})
export class SummaryComponent {
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const branches: string[] = this.route.snapshot.params['branches'].split(",");
        Service.SummaryOnBranch(branches);
    }

    ngOnDestroy() {
        Service.SummaryOnBranch([])
    }

    data = RxSummary;
}