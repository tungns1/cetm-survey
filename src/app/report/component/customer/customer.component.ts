import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAPI, RxInfoCustomer } from './service/customer.service';

@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss']
})
export class CustomerComponent {
    constructor(
        private customerApi: CustomerAPI,
        private route: ActivatedRoute
    ) { }

    customer_id: string;
    ngOnInit() {
        RxInfoCustomer.next(null);
        let id = this.route.snapshot.params['id'];
        if (id) {
            this.customer_id = id;
            this.customerApi.Search('', this.customer_id);
            this.customerApi.GetInfoCustomerById(this.customer_id).subscribe(v => {
                RxInfoCustomer.next(v);
            });
        }
    }

}