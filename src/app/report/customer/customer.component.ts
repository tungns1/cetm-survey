import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAPI, RxInfoCustomer } from './service/customer.service';
import { MatTabGroup } from '@angular/material';
import { CustomerView } from './shared/';
import { Customer, RuntimeEnvironment, USER_ROLES } from '../shared';
import { HistoryComponent } from './history/history.component'
import { ReportFilterComponent } from './filter/filter.component'
import { map } from 'rxjs/operators';

@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerComponent {
    constructor(
        private customerApi: CustomerAPI,
        private route: ActivatedRoute,
        private env: RuntimeEnvironment
    ) { }


    @ViewChild(HistoryComponent) cusHistory: HistoryComponent;
    @ViewChild(ReportFilterComponent) cusFilter: ReportFilterComponent;
    customer_id: string;
    data$ = this.customerApi.RxSummaryView;
    paddingStore = this.data$.pipe(map(data => {
        switch (data.stores.length) {
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
    }));
    paddingFres = this.data$.pipe(map(data => {
        switch (data.fres.length) {
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
    }));
    paddingService = this.data$.pipe(map(data => {
        switch (data.services.length) {
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
    }));
    selectedTab: number;
    isAdminStandard: boolean;

    ngOnInit() {
        this.env.Auth.User$.subscribe(u => {
            this.isAdminStandard = u.role === USER_ROLES.ADMIN_STANDARD
        });
        RxInfoCustomer.next(null);
        let id = this.route.snapshot.params['id'];
        if (id && id != "") {
            this.customer_id = id;
            this.customerApi.GetInfo('', this.customer_id);
            this.customerApi.pagin(1, '', this.customer_id);
            this.customerApi.GetInfoCustomerById(this.customer_id).subscribe(v => {
                RxInfoCustomer.next(new Customer(v));
            });
        }
    }

    onTabChange(e) {
        this.selectedTab = e.index;
    }

    refresh(e) {
        this.cusHistory.pagin(1);
        this.cusFilter.Filter();
    }
}