import { Component, Input } from '@angular/core';
import { MakeIndexBy } from '../../shared';

import { ChartService } from './chart.service';

@Component({
    selector: 'report-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.css']
})
export class ReportChartComponent {
    constructor(
        private chartService: ChartService
    ) { }

    type: string = 'pie';
    data = this.chartService.RxAggregateByTime;
    period = this.chartService.RxPeriod;
    items = this.chartService.RxItems;
    pieData = this.chartService.RxSummaryView;
    itemPie = this.chartService.RxItemPie;
    w = this.chartService.RxW;

    Toggle(d) {
        this.chartService.Toggle(d);
    }

    TogglePie(v) {
        this.chartService.TogglePie(v);
    }
}