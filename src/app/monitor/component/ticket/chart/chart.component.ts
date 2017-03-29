import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '../../shared';
import { ChartItem, PieItems } from './chart.model';
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

    ngOnInit() {
        this.setTitle();
    }

    ngAfterContentInit() {
        this.view.groups$.subscribe(groups => {
            setTimeout(_ => {
                this.groups$.next(groups);
            }, 1000)
        });
    }

    private setTitle() {
        let pieItems: ChartItem[][] = [];
        PieItems.forEach(v => {
            v.forEach(f => f.title = this.translateService.instant(f.key_title));
            if (v.length > 0) {
                this.itemGroup.push(v);
            }
        });
    }

    @ViewChild(ChartItemGroupView) view: ChartItemGroupView;
    groups$ = new BehaviorSubject<ChartItemGroup[]>([]);

}