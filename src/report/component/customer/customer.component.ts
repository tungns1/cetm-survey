import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggregateService, ReportFilterService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomerAPI } from './service/customer.service';

@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html'
})
export class CustomerComponent {
    constructor(
        private customerApi: CustomerAPI,
        private route: ActivatedRoute
    ) { }
    customer_id :string;
    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id) {
            this.customer_id = id;
            this.customerApi.Search(id);
        }

    }
}