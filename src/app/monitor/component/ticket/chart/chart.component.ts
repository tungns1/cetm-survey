import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChartItemGroupView, ChartItemGroup } from '../../../../x/ng/d3/chart-items.component';

@Component({
    selector: 'monitor-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorChartComponent {
    constructor(
        private translateService: TranslateService,
    ) { }

    @Input() data = {};

    // itemGroup = PieItems;
    itemGroup = [];

}