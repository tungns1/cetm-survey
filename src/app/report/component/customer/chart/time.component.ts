import { Component, Input } from '@angular/core';
import { AggregateService, TranslateService } from '../../shared';
import { ChartItem, TimeItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
        this.setTab();
    }

    period = this.chartService.RxPeriod;
    pieData = this.chartService.RxSummaryView;

    private setTab() {
        let pieItems: ChartItem[][] = [];
        TimeItems.forEach(v => {
            v.forEach(f => f.title = this.translateService.instant(f.key_title));
            if (v.length > 0) {
                pieItems.push(v);
            }
        });
        this.pieItems$.next(pieItems);
    }


    TogglePie(item: ChartItem) {
        const items: ChartItem[][] = [];
        this.pieItems$.value.forEach(i => {
            let data: ChartItem[] = [];
            i.forEach(v => {
                if (v.field === item.field) {
                    v._hidden = !v._hidden;
                }
                data.push(v);
            })
            items.push(data);
        });
        this.pieItems$.next(items);
    }

    pieItems$ = new BehaviorSubject<ChartItem[][]>([]);
}