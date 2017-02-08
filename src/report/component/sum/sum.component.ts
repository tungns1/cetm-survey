import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AggregateView, RxSummaryView } from '../../service/aggregate.service';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html',
    styleUrls: ['sum.component.scss']
})
export class ReportSumComponent {
    data: AggregateView;

    ngOnInit() {
        RxSummaryView.subscribe(v => {
            this.data = v;
            console.log(v);
        })
    }

    ngOnDestroy() {

    }


}