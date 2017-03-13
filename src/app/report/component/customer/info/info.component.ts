import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Customer, IService, IStore } from '../../shared/';
import { CustomerAPI, max_service, max_store, customer } from '../service/customer.service';
import { Model } from '../../shared/';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class ReportInfoComponent {
    @Input() id: string;
    constructor(
        private customerAPI: CustomerAPI
    ) { }
    customer: Model.Org.ICustomer;
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
        this.customer = customer.value;
        if (this.id != '') {
            this.customerAPI.GetInfoCustomerById(this.id).subscribe(v => {
                this.customer = v;
            })
        }
    }

    ngOnDestroy() {

    }
}