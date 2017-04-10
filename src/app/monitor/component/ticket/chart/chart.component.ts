import { Component, Input, ViewChild, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChartItemGroupView, ChartItemGroup } from '../../../../x/ng/d3/chart-items.component';

@Component({
    selector: 'monitor-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorChartComponent {
    @Input() data = {};

}