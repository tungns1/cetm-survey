import { Component, Input, ViewChild, ContentChild } from '@angular/core';
import { ChartItemGroupView } from '../shared';
import { ChartService } from './chart.service';

@Component({
    selector: 'report-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ReportChartComponent {
    constructor(
        private chartService: ChartService
    ) {

    }

    type: string = 'pie';

    get isPie() {
        return this.type === 'pie';
    }

    data = this.chartService.RxAggregateByTime;
    period = this.chartService.RxPeriod;
    pieData = this.chartService.RxSummaryView;
    // @ContentChild(ChartItemGroupView) config: ChartItemGroupView;
    @ContentChild("pieConfig") pieConfig: ChartItemGroupView;
    @ContentChild("otherConfig") otherConfig: ChartItemGroupView;
    @Input() active: string;
}