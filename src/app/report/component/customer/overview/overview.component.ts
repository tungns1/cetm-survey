import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportViewService } from '../../shared';
import { MAIN_TABS } from '../shared';
import { CustomerAPI, max_service, max_store } from '../service/customer.service';
import { Customer, IService, IStore, IFre } from '../../shared/';
@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.scss']
})
export class ReportOverViewComponent {

    constructor(
        private viewService: ReportViewService,
        private customerAPI: CustomerAPI
    ) { }


    ngOnInit() {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
            this.services = v.services;
            this.stores = v.stores;
            this.fres = v.fres;
            max_service.next(this.services[this.services.length - 1]);
            max_store.next(this.stores[this.stores.length - 1]);
        });
    }
    data: Customer;
    tab$ = this.viewService.ValueChanges.map(v => v.GetTab()).share();
    store$ = this.tab$.map(tab => tab === MAIN_TABS.STORE.name);
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    service$ = this.tab$.map(tab => tab === MAIN_TABS.SERVICE.name);
    frequency$ = this.tab$.map(tab => tab === MAIN_TABS.FREQUENCY.name);
    services: IService[] = [];
    stores: IStore[] = [];
    fres: IFre[] = [];


}