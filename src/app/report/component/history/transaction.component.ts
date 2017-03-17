import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, ModalComponent, ICustomer } from '../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransactionHistoryApi } from './history.service';

@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html'
})
export class TransactionComponent implements OnInit {

    constructor(
        private router: Router,
        private transactionHistoryApi: TransactionHistoryApi,
    ) { }
    customer: ICustomer;
    ngOnInit() {

    }

    @ViewChild(ModalComponent) modal: ModalComponent;

    SetData(d: ITransactionView) {
        this.link = '';
        this.data = d;
        if (d.audio) {
            // this.link = this.appService.MakeLink(`/api/report/record/${d.audio}`);
        }
        this.modal.Open();
    }
    GetInfoCustomer(d: ITransactionView) {
        this.customer = null;
        this.transactionHistoryApi.GetInfoCustomer(d.customer_id).subscribe(v => {
            this.customer = v;
        });
    }


    Close() {
        this.modal.Close();
    }
    goToCustomer(customer_id: string) {
        this.router.navigate(['/report/customer',customer_id]);
    }

    data = {};
    link: string;
}