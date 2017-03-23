import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Customer, IService, IStore } from '../../shared/';
import { CustomerAPI, max_service, max_store } from '../service/customer.service';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class ReportInfoComponent {
    constructor(
        private customerAPI: CustomerAPI
    ) { }
    customer = {};
    data: Customer;
    service: IService;
    store: IStore;

    ngOnInit() {
        max_service.subscribe(v => {
            this.service = v;
        });
        max_store.subscribe(v => {
            this.store = v;
        })
        this.customerAPI.RxSummaryView.subscribe(v=>{
            this.data=v;
        })
        
        // this.customerAPI.GetInfoCustomerById('aabb').subscribe(c => {
        //     if(c){
        //         console.log(c);
        //     }
        // })
    }

    ngOnDestroy() {

    }
}