import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Customer } from '../../shared/';
import { CustomerAPI } from '../service/customer.service';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html'
})
export class ReportInfoComponent {
    constructor(
        private customerAPI: CustomerAPI
    ) { }

    data: Customer;

    ngOnInit() {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
            console.log(v);
        })
    }

    ngOnDestroy() {

    }
}