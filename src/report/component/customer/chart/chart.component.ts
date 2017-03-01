import { Component, Input } from '@angular/core';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { AggregateService, Lib } from '../../shared';
import { ChartItem, MainItems, PieItems } from './chart.model';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'report-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.css']
})
export class ReportChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: Lib.I18n.TranslateService,
        private viewService: ReportViewService
    ) { }

    ngOnInit() {
        this.viewService.ValueChanges.subscribe(v => {
            this.setTab(v.GetTab());
        })
    }

    type: string = 'pie';

    get isPie() {
        return this.type === 'pie';
    }

    get isBar() {
        return this.type === 'bar';
    }

    get isStack() {
        return this.type === 'stack';
    }

    get isLine() {
        return this.type === 'line';
    }

    data = this.chartService.RxCustomerByTime;
    period = this.chartService.RxPeriod;
    pieData = this.chartService.RxSummaryView;

    private setTab(tab: string) {
        const items = MainItems.filter(v => v.tab === tab);
        items.forEach(f => f.title = this.translateService.instant(f.key_title));
        this.items$.next(items);

        let pieItems: ChartItem[][] = [];
        PieItems.forEach(v => {
            let field = v.filter(s => s.tab === tab);
            field.forEach(f => f.title = this.translateService.instant(f.key_title));
            if (field.length > 0) {
                pieItems.push(field);
            }
        });
        this.pieItems$.next(pieItems);
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


    items$ = new BehaviorSubject<ChartItem[]>([]);
    pieItems$ = new BehaviorSubject<ChartItem[][]>([]);

}