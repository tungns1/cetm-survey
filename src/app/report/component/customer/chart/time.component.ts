import { Component, Input } from '@angular/core';
import { TranslateService } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Customer } from '../../shared';

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
        this.chartService.RxSummaryView.subscribe(v=>{
            this.pieData=v
        })
    }
    pieData :Customer;
}