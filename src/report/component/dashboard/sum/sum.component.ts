import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RxSummaryView } from '../../service/';
import { AggregateView } from '../../model';

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