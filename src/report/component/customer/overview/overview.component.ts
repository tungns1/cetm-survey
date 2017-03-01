import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportViewService } from '../../shared';
import { MAIN_TABS } from '../shared';
import { CustomerAPI } from '../service/customer.service';

@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html'
})
export class ReportOverViewComponent {

    constructor(
        private viewService: ReportViewService,
        private customerAPI:CustomerAPI
    ) { }


    ngOnInit() {

    }

    tab$ = this.viewService.ValueChanges.map(v => v.GetTab()).share();
    store$ = this.tab$.map(tab => tab === MAIN_TABS.STORE.name);
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    service$ = this.tab$.map(tab => tab === MAIN_TABS.SERVICE.name);
    frequency$ = this.tab$.map(tab => tab === MAIN_TABS.FREQUENCY.name);
    data$ = this.customerAPI.ActiveCustomer$;
}