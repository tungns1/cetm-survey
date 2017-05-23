import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ITransaction, Paging } from '../../shared';
import { CustomerAPI, paging } from '../service/customer.service';
import { TransactionComponent } from './transaction.component'


@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})

export class HistoryComponent {
    constructor(
        private mdDialog: MdDialog,
        private customerAPI: CustomerAPI
    ) { }
    @Input() id: string;
    paging = paging;


    ngOnInit() {
        this.customerAPI.pagin(1, '', this.id);
    }
    pagin(page: number) {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.customerAPI.pagin(page, '', v.customer_id);
        });

    }

    openDialog(ticket: ITransaction) {
        const config = new MdDialogConfig();
        config.width = '350px';
        config.data = ticket;
        const dialog = this.mdDialog.open(TransactionComponent, config);
    }

    excel(data) {
        this.customerAPI.ExportHistory();
    }

}