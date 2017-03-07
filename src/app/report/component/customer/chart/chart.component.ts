import { Component, Input } from '@angular/core';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { AggregateService, Lib } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'customer-chart',
    templateUrl: 'chart.component.html'
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
    tab = '';

    private setTab(tab: string) {
        this.tab = tab;
    }

}