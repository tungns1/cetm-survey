import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html'
})
export class ReportInfoComponent {
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