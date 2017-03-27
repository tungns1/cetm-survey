import { Component, OnInit, Input } from '@angular/core';
import { ITransactionView } from '../../../model';
import { ReportFilterService, Paging } from '../../../service/';
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
             this.customerAPI.pagin(page,'', v.customer_id);
        });
       
    }


    excel() {
        this.customerAPI.ExportHistory();
        // return ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');
    } 

}
