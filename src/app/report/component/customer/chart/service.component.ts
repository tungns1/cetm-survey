import { Component, Input } from '@angular/core';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { AggregateService, Lib } from '../../shared';
import { ChartItem, ServiceItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'service-chart',
    templateUrl: 'service.component.html'
})
export class ServiceChartComponent {
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
    data = this.chartService.RxService;
    period = this.chartService.RxPeriod;

    private setTab() {
        this.items$.next(ServiceItems);
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