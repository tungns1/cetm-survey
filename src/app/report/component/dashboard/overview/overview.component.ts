import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AggregateService } from '../shared';
import { ReportViewService, ExportExcelService } from '../../shared';
import { MAIN_TABS } from '../shared';

@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.scss']
})
export class ReportOverViewComponent {

    constructor(
        private aggregateService: AggregateService,
        private viewService: ReportViewService,
        private getExcel: ExportExcelService
    ) { }


    ngOnInit() {

    }

    tab$ = this.viewService.Tab$;
    general$ = this.tab$.map(tab => tab === MAIN_TABS.GENERAL.name);
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    customer$ = this.tab$.map(tab => tab === MAIN_TABS.CUSTOMER.name);

    data$ = this.aggregateService.ActiveAggregate$;
    groupBy$ = this.aggregateService.groupBy$;



    excel() {
        this.getExcel.exportExcel('tableEl', 'miraway', 'xlsx');
    }


}