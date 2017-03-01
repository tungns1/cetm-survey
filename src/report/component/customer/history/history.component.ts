import { Component, OnInit, Input } from '@angular/core';
import { ITransactionView } from '../../../model';
import { ReportFilterService, ReportFilter } from '../../../service/';
import { Paging} from '../../../shared/paging.service';
import { CustomerAPI} from '../service/customer.service';


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
    paging = new Paging<ITransactionView>();

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.chuyenTrang(1);
        });
    }
    chuyenTrang(page: number) {
        const skip = this.paging.SkipForPage(page);
        const limit = this.paging.Limit;
        this.customerAPI.GetHistory(this.filterService.Current, skip, limit, this.customer)
            .subscribe(v => {
                this.paging.SetPage(page);
                this.paging.Reset(v.data, v.total);
            });
    }


    excel() {
        this.customerAPI.ExportHistory(this.filterService.Current);
    }

}
