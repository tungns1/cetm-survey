import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AggregateService, ReportViewService } from '../../shared';
import { MAIN_TABS } from '../shared';

@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.css']
})
export class ReportOverViewComponent {

    constructor(
        private aggregateService: AggregateService,
        private viewService: ReportViewService
    ) { }


    ngOnInit() {

    }

    tab$ = this.viewService.ValueChanges.map(v => v.GetTab()).share();
    store$ = this.tab$.map(tab => tab === MAIN_TABS.STORE.name);
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    service$ = this.tab$.map(tab => tab === MAIN_TABS.SERVICE.name);
    frequency$ = this.tab$.map(tab => tab === MAIN_TABS.FREQUENCY.name);
    data$ = this.aggregateService.ActiveAggregate$;
    groupBy$ = this.aggregateService.groupBy$;
}