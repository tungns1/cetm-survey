import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Customer, IService, IStore, ICustomer } from '../../shared/';
import { CustomerAPI, max_service, max_store, RxInfoCustomer } from '../service/customer.service';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class ReportInfoComponent {
    constructor(
        private customerAPI: CustomerAPI
    ) { }
    customer: ICustomer = null;
    data: Customer;
    service: IService;
    store: IStore;

    ngOnInit() {
      RxInfoCustomer.subscribe(v=>{
          if(v!=null){
              this.customer=v;
          }
      })
        max_service.subscribe(v => {
            this.service = v;
        });
        max_store.subscribe(v => {
            this.store = v;
        })
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
        })
    }

    ngOnDestroy() {

    }
}