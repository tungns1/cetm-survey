import { Component, Input } from '@angular/core';
import { AggregateService, TranslateService } from '../../shared';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { ChartItem, FresItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'fres-chart',
    templateUrl: 'fres.component.html'
})
export class FresChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: TranslateService,
        private viewService: ReportViewService
    ) { } 

    ngOnInit() {
    
    }

    data = this.chartService.RxFres;
    period = this.chartService.RxPeriod;
}