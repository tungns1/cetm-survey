import { Component, Input } from '@angular/core';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { AggregateService, TranslateService } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'topfive-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class TopFiveChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: TranslateService,
        private viewService: ReportViewService
    ) { }

}