import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Customer, IService, IStore } from '../../shared/';
import { CustomerAPI, max_service, max_store } from '../service/customer.service';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html'
})
export class ReportInfoComponent {
    constructor(
        private customerAPI: CustomerAPI
    ) { }

    data: Customer;
    service: IService;
    store: IStore;

    ngOnInit() {
        max_service.subscribe(v => {
            this.service = v;
        });
        max_store.subscribe(v => {
            this.store = v;
        })
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
        })
    }

    ngOnDestroy() {

    }
}