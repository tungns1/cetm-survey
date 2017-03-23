import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';
import { ReportFilterService } from '../../../service/';
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
            this.code = v.id;
        })
    }

    code: string = '';
    Filter() {
        this.customerApi.Search(this.code, '');
        this.customerApi.pagin(1, this.code, '');
        this.customerApi.GetInfoCustomerByCode(this.code);
    }


}