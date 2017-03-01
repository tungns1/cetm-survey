import { Component, OnInit } from '@angular/core';
import { ITransactionView } from '../../model';
import { ReportFilterService, ReportFilter } from '../../service/';
import { TransactionHistoryApi } from './history.service';
import { Paging } from '../../shared/paging.service';
import { Model } from '@swimlane/ngx-datatable';

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.css']
})
export class HistoryComponent {
    constructor(
        private filterService: ReportFilterService,
        private transactionHistoryApi: TransactionHistoryApi
    ) { }

    paging = new Paging<ITransactionView>();

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.chuyenTrang(1);
        });
    }

    chuyenTrang(page: number) {
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        this.transactionHistoryApi.GetHistory(this.filterService.Current, skip, limit)
            .subscribe(v => {
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
            });
    }

    excel() {
        this.transactionHistoryApi.ExportHistory(this.filterService.Current);
    }

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];

}
