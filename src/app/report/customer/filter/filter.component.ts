import { Component, OnInit } from '@angular/core';
import { ReportFilterService, Customer } from '../../shared';
import { CustomerAPI, RxInfoCustomer } from '../service/customer.service';

@Component({
    selector: 'customer-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private customerApi: CustomerAPI,
    ) { }

    ngOnInit() {
        RxInfoCustomer.subscribe(v => {
            if (v != null) {
                this.code = v.code;
            }

        });
    }


    code: string = '';
    Filter() {
        if (this.code != "") {
            this.customerApi.GetInfo(this.code, '');
            this.customerApi.pagin(1, this.code, '');
            this.customerApi.GetInfoCustomerByCode(this.code).subscribe(v => {
                const c = new Customer(v);
                RxInfoCustomer.next(c);
            });
            RxInfoCustomer.next(null);
        }
    }


}