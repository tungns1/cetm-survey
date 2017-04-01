import { Component, Input, ViewChild } from '@angular/core';
import { ReportViewService } from '../../shared';
import { TranslateService } from '../../shared';
import { ChartItem, MainItems, PieItems } from './chart.model';
import { ChartService } from './chart.service';

@Component({
    selector: 'report-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ReportChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: TranslateService,
        private viewService: ReportViewService
    ) { }

    type: string = 'pie';

    get isPie() {
        return this.type === 'pie';
    }

    data = this.chartService.RxAggregateByTime;
    period = this.chartService.RxPeriod;
    pieData = this.chartService.RxSummaryView;
    tab$ = this.viewService.Tab$;
}