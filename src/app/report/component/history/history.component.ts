import { Component, OnInit } from '@angular/core';
import { ITransactionView } from '../../model';
import { ReportFilterService, ReportFilter } from '../../service/';
import { TransactionHistoryApi } from './history.service';
import { Paging } from '../../shared/paging.service';

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.css']
})
export class HistoryComponent {
    constructor(
        private filterService: ReportFilterService,
        private transactionHistoryApi: TransactionHistoryApi,
    ) { }

    
    submitted = false;

    onSubmit() {
        console.log(this.filter);
        this.submitted = true;
        const skip = this.paging.SkipForPage(1);
        const limit = this.paging.Limit;
        this.transactionHistoryApi.GetHistory(this.filterService.Current, skip, limit, this.filter)
        .subscribe(v => {
            this.paging.SetPage(1);
            this.paging.Reset(v.data, v.total);
        });
    }

    filter = {
        wtimemin: 0,
        wtimemax: 0,
        stimemin: 0,
        stimemax: 0,
        rating: ''
    };

    sync(){
        if(this.filter.wtimemin > this.filter.wtimemax)
            this.filter.wtimemax = this.filter.wtimemin;
        if(this.filter.stimemin > this.filter.stimemax)
            this.filter.stimemax = this.filter.stimemin;
    }

    paging = new Paging<ITransactionView>();

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.chuyenTrang(1);
        });
    }

    filterHistory() {
        // console.log(this.form);
    }

    chuyenTrang(page: number) {
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        const filter = {};
        this.transactionHistoryApi.GetHistory(this.filterService.Current, skip, limit, filter)
            .subscribe(v => {
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
            });
    }

    excel() {
        this.transactionHistoryApi.ExportHistory(this.filterService.Current);
    }

    // rows = [
    //     { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //     { name: 'Dany', gender: 'Male', company: 'KFC' },
    //     { name: 'Molly', gender: 'Female', company: 'Burger King' },
    // ];
    // columns = [
    //     { prop: 'name' },
    //     { name: 'Gender' },
    //     { name: 'Company' }
    // ];

}
