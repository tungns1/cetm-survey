import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, Lib, SharedService } from '../../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html',
    styleUrls: ['transaction.component.scss']
})
export class TransactionComponent implements OnInit {

    constructor(
        private appService: SharedService.AppState,
        private router: Router,
    ) { }

    ngOnInit() {

    }

    @ViewChild(Lib.Ng.ModalComponent) modal: Lib.Ng.ModalComponent;

    SetData(d: ITransactionView) {
        this.link = '';
        this.data = d;
        if (d.audio) {
            this.link = this.appService.MakeLink(`/api/report/record/${d.audio}`);
        }
        this.modal.Open();
    }

    Close() {
        this.modal.Close();
    }
    goToCustomer(customer_id: string) {
        this.router.navigate(['/customer', customer_id]);
    }

    data = {};
    link: string;
}