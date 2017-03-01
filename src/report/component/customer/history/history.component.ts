import { Component, OnInit, Input } from '@angular/core';
import { ITransactionView } from '../../../model';
import { ReportFilterService, ReportFilter } from '../../../service/';
import { Paging } from '../../../shared/paging.service';
import { CustomerAPI,paging } from '../service/customer.service';


@Component({
    selector: 'history',
    templateUrl: 'history.component.html'
})

export class HistoryComponent {
    constructor(
        private filterService: ReportFilterService,
        private customerAPI: CustomerAPI
    ) { }
    @Input() customer: string;
    paging = paging;

    ngOnInit() {
        this.customerAPI.ChuyenTrang(1, this.customer);
    }
    chuyenTrang(page: number) {
        this.customerAPI.ChuyenTrang(page, this.customer);
    }


    excel() {
        this.customerAPI.ExportHistory(this.filterService.Current);
    }

}
