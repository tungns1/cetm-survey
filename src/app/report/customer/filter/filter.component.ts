import { Component, OnInit } from '@angular/core';
import { ReportFilterService, Customer } from '../../shared';
import { CustomerAPI, RxInfoCustomer } from '../service/customer.service';
import { Toast } from '../../../x/ui/noti/toastr';
@Component({
    selector: 'customer-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private customerApi: CustomerAPI,
    ) { }
toast = new Toast;
    ngOnInit() {
        RxInfoCustomer.subscribe(v => {
            if (v != null) {
                this.code = v.code;
            }

        });
    }


    code: string = '';
    Filter() {
            this.customerApi.GetInfo(this.code, '');
            this.customerApi.pagin(1, this.code, '');
            this.customerApi.GetInfoCustomerByCode(this.code).subscribe(v => {
                const c = new Customer(v);
                RxInfoCustomer.next(c);
            },
            error=>{
                 this.toast.Title('Info').Info("Code does not exist").Show();
            });
            RxInfoCustomer.next(null);
        
    }


}