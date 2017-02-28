import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportFilterService } from '../../../service/';
import { CustomerAPI } from '../service/customer.service';


@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html'
})
export class ReportFilterComponent {
    constructor(
        private customerApi: CustomerAPI,
    ) { }

    id_customer: string = '';
    Search() {
       this.customerApi.Search(this.id_customer);
    }


}