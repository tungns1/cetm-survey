import { Component, Input } from '@angular/core';
import { AggregateService, TranslateService } from '../../shared';
import { MakeIndexBy } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'time-chart',
    templateUrl: 'time.component.html'
})
export class TimeChartComponent {

    multi: any[];

    view: any[] = [900, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ff0000', '#3333ff', '#6600cc', '#00ff00', '#800000', '#999966', '#660066', '#ff00ff']
    };
    autoScale = true;

    constructor(private chartService: ChartService) {
        this.chartService.RxTime.subscribe(v => {
            this.multi = v;
        })

    }

    onSelect(event) {
        console.log(event);
    }
}