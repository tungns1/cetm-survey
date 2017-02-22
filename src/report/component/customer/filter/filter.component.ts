import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportFilterService } from '../../../service/';
import { CustomerAPI } from './filter.service';


@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html'
})
export class ReportFilterComponent {
    constructor(
        private filterService: ReportFilterService,
        private customerApi: CustomerAPI,
    ) { }

    id_customer: string = '';
    Search() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.customerApi.Search_History(filter, this.id_customer);
        });
         this.filterService.ExclusiveSubscribe(filter => {
            this.customerApi.Search_Agg(filter, this.id_customer);
        });
    }


}