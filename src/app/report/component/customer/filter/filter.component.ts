import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';
import { ReportFilterService } from '../../../service/';
import { CustomerAPI } from '../service/customer.service';


@Component({
    selector: 'customer-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private customerApi: CustomerAPI,
    ) { }

    code: string = '';
    Filter() {
       this.customerApi.Search(this.code,'');
       this.customerApi.ChuyenTrang(1,this.code,'');
       this.customerApi.GetInfoCustomerByCode(this.code);
    }


}