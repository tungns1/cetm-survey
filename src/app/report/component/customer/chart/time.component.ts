import { Component, Input } from '@angular/core';
import { AggregateService, TranslateService } from '../../shared';
import { ChartItem, TimeItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'time-chart',
    templateUrl: 'time.component.html'
})
export class TimeChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
    }

    period = this.chartService.RxPeriod;
    pieData = this.chartService.RxSummaryView;
    pieItems$ = new BehaviorSubject<ChartItem[][]>([]);
}