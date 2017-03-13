import { Component, Input } from '@angular/core';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { AggregateService, Lib } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'service-chart',
    templateUrl: 'service.component.html'
})
export class ServiceChartComponent {
    single: any[];

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
    
    constructor(private chartService: ChartService) {
        this.chartService.RxService.subscribe(v=>{
            this.single=v;
        })

    }

    onSelect(event) {
        console.log(event);
    }
}