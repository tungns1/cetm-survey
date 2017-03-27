import { Component, OnInit } from '@angular/core';
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
            console.log(v);
            if (v != null) {
                this.code=v.code;
            }

        })
    }


    code: string = '';
    Filter() {
        this.customerApi.Search(this.code, '');
        this.customerApi.pagin(1, this.code, '');
        this.customerApi.GetInfoCustomerByCode(this.code).subscribe(v => {
            RxInfoCustomer.next(v);
        });;
    }


}