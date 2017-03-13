import { Component, Input } from '@angular/core';
import { AggregateService, Lib } from '../../shared';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'store-chart',
    templateUrl: 'store.component.html'
})
export class StoreChartComponent {
    single: any[];

    view: any[] = [800, 400];

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

    constructor(private chartService: ChartService) {
        this.chartService.RxStore.subscribe(v=>{
            this.single=v;
        })
    }

    onSelect(event) {
        console.log(event);
    }
}  