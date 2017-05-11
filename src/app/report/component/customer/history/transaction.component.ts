import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, ModalComponent, ICustomer, RuntimeEnvironment,Customers } from '../../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RxInfoCustomer } from '../service/customer.service';
import { TransactionHistoryApi } from '../../history/history.service';


@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html'
})
export class TransactionComponent implements OnInit {

    constructor(
        private router: Router,
        private transactionHistoryApi: TransactionHistoryApi,
        private env: RuntimeEnvironment
    ) { }
    customer: ICustomer;
    data = {};
    link: string;
    state: string;

    ngOnInit() {

    }
    // customer = RxInfoCustomer;
    @ViewChild(ModalComponent) modal: ModalComponent;

    SetData(d: ITransactionView) {
        this.link = '';
        this.data = d;
        // console.log(d);
        if (d.audio) {
            this.link=this.env.Platform.Http+'/api/report/record/'+d.audio;
            // this.link = this.appService.MakeLink(`/api/report/record/${d.audio}`);
        }
        this.modal.Open();
    }

    GetInfoCustomer(d: ITransactionView) {
        this.state=d.state.charAt(0).toUpperCase() + d.state.slice(1);
        this.transactionHistoryApi.GetInfoCustomer(d.customer_id).subscribe(v => {
            this.customer = new Customers(v);
        });
    }

    Close() {
        this.customer = null;
        this.modal.Close();
    }
}