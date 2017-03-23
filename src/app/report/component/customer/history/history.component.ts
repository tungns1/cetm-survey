import { Component, OnInit, Input } from '@angular/core';
import { ITransactionView } from '../../../model';
import { ReportFilterService } from '../../../service/';
import { Paging } from '../../../shared/paging.service';
import { CustomerAPI, paging } from '../service/customer.service';


@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})

export class HistoryComponent {
    constructor(
        private filterService: ReportFilterService,
        private customerAPI: CustomerAPI
    ) { }
    @Input() id: string;
    paging = paging;


    ngOnInit() {
        this.customerAPI.pagin(1,'', this.id);
    }
    pagin(page: number) {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.id = v.customer_id;
        });
        this.customerAPI.pagin(page,'', this.id);
    }


    excel() {
        this.customerAPI.ExportHistory();
    } 

}
