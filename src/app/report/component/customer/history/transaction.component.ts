import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, ModalComponent } from '../../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RxInfoCustomer } from '../service/customer.service';


@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html'
})
export class TransactionComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {

    }
    customer = RxInfoCustomer;
    @ViewChild(ModalComponent) modal: ModalComponent;

    SetData(d: ITransactionView) {
        this.link = '';
        this.data = d;
        if (d.audio) {
            // this.link = this.appService.MakeLink(`/api/report/record/${d.audio}`);
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