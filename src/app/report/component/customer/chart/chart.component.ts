import { Component, Input } from '@angular/core';
import { ReportViewService } from '../../shared';
import { TranslateService } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'customer-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ReportChartComponent {
    constructor(
        private chartService: ChartService,
        private translateService: TranslateService,
        private viewService: ReportViewService
    ) { }

    ngOnInit() {
        this.viewService.Data$.subscribe(v => {
            this.setTab(v.tab);
        })
    }
    tab = '';

    private setTab(tab: string) {
        this.tab = tab;
    }

}