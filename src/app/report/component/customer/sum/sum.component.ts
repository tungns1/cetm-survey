import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Customer } from '../../shared/';
import { CustomerAPI } from '../service/customer.service';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html'
})
export class ReportSumComponent {
    constructor(
        private customerAPI: CustomerAPI
    ) { }

    data: Customer;

    ngOnInit() {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
        })
    }

    ngOnDestroy() {

    }


}