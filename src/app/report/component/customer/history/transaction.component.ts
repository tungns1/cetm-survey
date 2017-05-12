import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { ITransactionView, ModalComponent, ICustomer, RuntimeEnvironment, Customers } from '../../shared';
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
        private env: RuntimeEnvironment,
        private dialog: MdDialog,
        @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
    ) { }
    customer: ICustomer;
    data = {};
    link: string;
    state: string;
    
    @ViewChild(ModalComponent) modal: ModalComponent;

    ngOnInit() {
        this.link = '';
        this.data = this.dialogData;
        this.GetInfoCustomer(this.dialogData);
        if (this.dialogData.audio) {
            this.link = this.env.Platform.Http + '/api/report/record/' + this.dialogData.audio;
        }
    }

    private GetInfoCustomer(d: ITransactionView) {
        this.state = d.state.charAt(0).toUpperCase() + d.state.slice(1);
        this.transactionHistoryApi.GetInfoCustomer(d.customer_id).subscribe(v => {
            this.customer = new Customers(v);
        });
    }

    Close() {
        this.dialog.closeAll();
    }
}