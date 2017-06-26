import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ReportFilterService, Customer } from '../../shared';
import { CustomerAPI, RxInfoCustomer } from '../service/customer.service';
import { TranslateService } from '../../../shared/util'

@Component({
    selector: 'customer-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private customerApi: CustomerAPI,
        private snackBar: MdSnackBar,
        private translateService: TranslateService
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
        this.customerApi.GetInfo(this.code, '');
        this.customerApi.pagin(1, this.code, '');
        this.customerApi.GetInfoCustomerByCode(this.code).subscribe(v => {
            const c = new Customer(v);
            RxInfoCustomer.next(c);
        },
            error => {
                this.snackBar.open(this.translateService.translate('Code does not exist'), '', { duration: 6000 });
            });
        RxInfoCustomer.next(null);

    }


}