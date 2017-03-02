import { Component, Input } from '@angular/core';
import { Lib } from '../../shared';
import { ChartItem, PieItems } from './chart.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    selector: 'monitor-chart',
    templateUrl: 'chart.component.html'
})
export class MonitorChartComponent {
    constructor(
        private translateService: Lib.I18n.TranslateService,
    ) { }

    @Input() data = {
    };


    itemGroup = PieItems;

}