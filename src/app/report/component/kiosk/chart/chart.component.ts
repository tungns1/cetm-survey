import { Component, Input } from '@angular/core';
import { MakeIndexBy, ReportViewService } from '../../shared';
import { AggregateService, TranslateService } from '../../shared';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MAIN_TABS } from '../shared';
@Component({
    selector: 'kiosk-chart',
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
    }
    tab$ = this.viewService.Tab$;
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    ticket$ = this.tab$.map(tab => tab === MAIN_TABS.TICKET.name);

}