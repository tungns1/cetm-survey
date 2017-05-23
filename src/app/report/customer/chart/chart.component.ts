import { Component, Input, ContentChild } from '@angular/core';
import { ChartItemGroupView } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomerAPI } from '../service/customer.service';

@Component({
    selector: 'customer-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ReportChartComponent {
    constructor(private customerApi: CustomerAPI) { }

    ngOnInit() {

    }
    @ContentChild("pieConfig") pieConfig: ChartItemGroupView;
    data$ = this.customerApi.RxSummaryView;
}