import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAPI, RxInfoCustomer } from './service/customer.service';
import { MdTabGroup } from '@angular/material';

@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerComponent {
    constructor(
        private customerApi: CustomerAPI,
        private route: ActivatedRoute
    ) { }

    customer_id: string;
    data$=this.customerApi.RxSummaryView;
    paddingStore = this.data$.map(data => {
        switch (data.stores.length){
        case 1:
            return 2000;
        case 2:
            return 500;
        case 3:
            return 200;
        case 4:
            return 50;
        default:
            return 10;
        }
    });
    paddingService = this.data$.map(data => {
        switch (data.services.length){
        case 1:
            return 2000;
        case 2:
            return 500;
        case 3:
            return 200;
        case 4:
            return 50;
        default:
            return 10;
        }
    });
    selectedTab: number;

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

    onTabChange(e){
        this.selectedTab = e.index;
    }
}