import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AggregateService, ReportFilterService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomerAPI } from './service/customer.service';

@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss']
})
export class CustomerComponent {
    constructor(
        private customerApi: CustomerAPI,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    customer_id :string;
    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id) {
            this.customer_id = id;
            this.customerApi.Search('',this.customer_id);
            this.customerApi.GetInfoCustomerById(this.customer_id);
        }
    }
    
    nav(href: string){
        const queryParams = this.route.root.snapshot.queryParams;
        this.router.navigate([href], {
            queryParams: queryParams
        });
    }
}