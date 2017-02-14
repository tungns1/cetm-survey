import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html',
    styleUrls: ['sum.component.scss']
})
export class ReportSumComponent {
    constructor(
        private aggregateService: AggregateService
    ) { }

    data: Aggregate;

    ngOnInit() {
        this.aggregateService.RxSummaryView.subscribe(v => {
            this.data = v;
            console.log(v);
        })
    }

    ngOnDestroy() {

    }


}