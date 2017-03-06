import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
        private transactionHistoryApi: TransactionHistoryApi
    ) { }

    paging = new Paging<ITransactionView>();

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.chuyenTrang(1);
        });
    }

    filterHistory () {
        console.log('im in');
    }

    makeForm(u) {
        u = u || <any>{};
        return (new FormBuilder).group({
        id: [u.id],
        password: ['', u.id ? null : Validators.required], // do not require password on update
        username: [u.username, Validators.required],
        fullname: [u.fullname, Validators.required],
        email: [u.email],
        role: [u.role, Validators.required],
        branch_id: [u.branch_id, Validators.required],
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
