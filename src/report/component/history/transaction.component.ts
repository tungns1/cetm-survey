import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, Lib, SharedService } from '../shared';

@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html'
})
export class TransactionComponent implements OnInit {

    constructor(
        private appService: SharedService.AppState
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

    data = {};
    link: string;
}