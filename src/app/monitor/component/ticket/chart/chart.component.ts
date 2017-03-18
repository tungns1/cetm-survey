import { Component, Input } from '@angular/core';
import { TranslateService } from '../../shared';
import { ChartItem, PieItems } from './chart.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    selector: 'monitor-chart',
    templateUrl: 'chart.component.html'
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

    private setTitle() {
        let pieItems: ChartItem[][] = [];
        PieItems.forEach(v => {
            v.forEach(f => f.title = this.translateService.instant(f.key_title));
            if (v.length > 0) {
                this.itemGroup.push(v);
            }
        });
    }

}