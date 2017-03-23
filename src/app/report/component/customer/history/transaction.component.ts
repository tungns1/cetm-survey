import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, ModalComponent, ICustomer, RuntimeEnvironment } from '../../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

    ngOnInit() {

    }
    // customer = RxInfoCustomer;
    @ViewChild(ModalComponent) modal: ModalComponent;

    SetData(d: ITransactionView) {
        this.link = '';
        this.data = d;
        console.log(d);
        if (d.audio) {
            this.link=this.env.Platform.Http+'/api/report/record/'+d.audio;
            // this.link = this.appService.MakeLink(`/api/report/record/${d.audio}`);
        }
        this.modal.Open();
    }

    GetInfoCustomer(d: ITransactionView) {
        this.state=d.state;
        this.transactionHistoryApi.GetInfoCustomer(d.customer_id).subscribe(v => {
            this.customer = v;
            console.log(this.customer);
        });
    }

    Close() {
        this.customer = null;
        this.modal.Close();
    }

    data = {};
    link: string;
    state: string;
}