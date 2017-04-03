import { Component, Input } from '@angular/core';
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
    padding=8;


    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ff0000', '#3333ff', '#6600cc', '#00ff00', '#800000', '#999966', '#660066', '#ff00ff']
    };
    
    constructor(private chartService: ChartService) {
        this.chartService.RxService.subscribe(v=>{
            this.single=v;
             switch (this.single.length){
                case 1:
                this.padding = 3000;
                break;
                case 2:
                this.padding = 500;
                break;
                case 3:
                this.padding = 200;
                break;
                case 4:
                this.padding = 100;
                break;
                case 5:
                this.padding = 50;
                break;
                default:
                this.padding = 8;
            }
        })

    }

    onSelect(event) {
        console.log(event);
    }
}