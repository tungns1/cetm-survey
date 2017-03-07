import { Component, Input } from '@angular/core';
import { AggregateService, Lib } from '../../shared';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { ChartItem, StoreItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'store-chart',
    templateUrl: 'store.component.html'
})
export class StoreChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: Lib.I18n.TranslateService,
        private viewService: ReportViewService
    ) { }

    ngOnInit() {
        this.viewService.ValueChanges.subscribe(v => {
            this.setTab();
        })
    }

    data = this.chartService.RxStore;
    period = this.chartService.RxPeriod;

    private setTab() {
        this.items$.next(StoreItems);
    }


     Toggle(item: ChartItem) {
        const items: ChartItem[] = [];
        this.items$.value.forEach(i => {
            if (i.field === item.field) {
                i._hidden = !i._hidden;
            }
            items.push(i);
        });
        this.items$.next(items);
    }
    items$ = new BehaviorSubject<ChartItem[]>([]);
}  