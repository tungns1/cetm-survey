import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { CustomerView ,IValue} from '../shared';
import { CustomerAPI, RxInfoCustomer } from '../service/customer.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class ReportInfoComponent {
    constructor(
        private customerAPI: CustomerAPI
    ) { }
    data: CustomerView;
    service: IValue;
    store: IValue;

    ngOnInit() {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
            this.store = v.stores.sort((a, b) => b.value - a.value)[0]
            this.service = v.services.sort((a, b) => b.value - a.value)[0]
        })
    }
    customer = RxInfoCustomer.pipe(map(v => {
        if (v != null) {
            return v;
        }
        return null;
    }))

}