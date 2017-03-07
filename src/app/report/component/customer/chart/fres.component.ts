import { Component, Input } from '@angular/core';
import { AggregateService, Lib } from '../../shared';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { ChartItem, FresItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'fres-chart',
    templateUrl: 'fres.component.html'
})
export class FresChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: Lib.I18n.TranslateService,
        private viewService: ReportViewService
    ) { } 

    ngOnInit() {
        this.setTab()
    }

    data = this.chartService.RxFres;
    period = this.chartService.RxPeriod;

    private setTab() {
        this.items$.next(FresItems);
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