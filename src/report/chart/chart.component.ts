import { Component, Input } from '@angular/core';

import { IAggregate, AggregateView, RxSummaryView, RxAggregate, MakeIndexBy } from '../backend/aggregate.service';
import { RxPeriod } from '../filter/';
import { RxAggregateByTime, Toggle, RxItems,RxItemPie,TogglePie,RxW } from './chart.model';

@Component({
    selector: 'report-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.css']
})
export class ReportChartComponent {
    type: string = 'line';
    data = RxAggregateByTime;
    period = RxPeriod;
    items = RxItems;
    pieData = RxSummaryView;
    itemPie=RxItemPie;
    w=RxW;

    Toggle = Toggle;
    TogglePie=TogglePie;

}