import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private route: ActivatedRoute,
    ) { }
    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id) {
            this.customerApi.GetInfoCustomerById(id).subscribe(c => {
                if(c){
                    this.code = c.code;
                }
            })
        }
    }
    code: string = '';
    Filter() {
       this.customerApi.Search(this.code,'');
       this.customerApi.pagin(1,this.code,'');
       this.customerApi.GetInfoCustomerByCode(this.code);
    }


}