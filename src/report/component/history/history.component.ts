
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ITransactionView } from '../../model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/Observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReportFilterService } from '../../service/';
import { TransactionHistoryApi } from './history.service';
import { Ng } from '../../../x/';

interface IPage {
    page: number;
    title: string;
}
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
    data = this.transactionHistoryApi.data$;
    @ViewChild(Ng.ModalComponent) protected detail: Ng.ModalComponent;
    url_audio = '';
    ts: ITransactionView;
    active: any = {};

    ngOnInit() {
        this.Refresh();
    }
    Refresh() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.transactionHistoryApi.Refresh(filter);
        });
    }

    chuyenTrang(value) {
        this.current.next(value);
        this.active = this.filterService.Current;
        this.active.limit = this.pageSize$.value;
        this.active.skip = this.pageSize$.value * (this.current.value - 1);
        this.Refresh()
    }

    current = this.transactionHistoryApi.currentPage$;
    pageSize$ = this.transactionHistoryApi.pageSize$;
    skip = this.current.map(v => (v - 1) * this.pageSize$.value);
    info = this.current.map(c => `Hiển thị ${this.pageSize$.value} GD từ số ${(c - 1) * this.pageSize$.value + 1} đến số ${c * this.pageSize$.value}`);

    pages = Observable.combineLatest(this.transactionHistoryApi.count$, this.current, (count, current) => {

        const totalPage: number = Math.ceil(count / this.pageSize$.value);

        const pages: IPage[] = [];
        if (totalPage > 0) {
            pages.push({ page: 1, title: "First" });
            pages.push({ page: current - 1, title: "Previous" });
            pages.push({ page: 1, title: "1" });

            if (totalPage > 2) {
                if (current == 1) {
                    pages[1].page = 1;
                    pages.push({ page: 2, title: "2" });
                    if (totalPage > 3) {
                        pages.push({ page: 3, title: "3" });
                    }


                }
                if (current > 1 && totalPage > 3 && current < (totalPage - 1)) {
                    pages[1].page = current - 1;
                    if (current > 2) {
                        pages.push({ page: current - 1, title: (current - 1).toString() });
                    }
                    pages.push({ page: current, title: current.toString() });
                    pages.push({ page: current + 1, title: (current + 1).toString() });
                }
                if (current >= totalPage - 1) {
                    pages[1].page = current - 1;
                    pages.push({ page: totalPage - 1, title: (totalPage - 1).toString() });
                }
            }
            if (totalPage > 1) {
                pages.push({ page: totalPage, title: totalPage.toString() });
            }

            pages.push({ page: current + 1, title: "Next" });
            pages.push({ page: totalPage, title: "Last" });
            if (current === totalPage) {
                if (totalPage < 1) {
                    pages[3].page = totalPage;
                } else if (totalPage < 2) {
                    pages[4].page = totalPage;
                } else {
                    pages[5].page = totalPage;
                }

            }


        }
        return pages;
    })

    excel() {
        this.transactionHistoryApi.ExportHistory(this.filterService.Current);
    }
    Detail(ts: ITransactionView) {
        this.ts = ts;
        this.detail.Open();
    }
    Close() {
        this.detail.Close();
        this.Pause(this.ts);
    }
    Listen(ts: ITransactionView) {
        console.log(ts);
        if (this.ts) {
            this.Pause(this.ts);
        }
        this.ts = ts;
        ts.check = true;
        var audio = new Audio(ts.linkaudio);
        audio.play();
    }
    Pause(ts: ITransactionView) {
        ts.check = false;
        var audio = new Audio(ts.linkaudio);
        audio.pause();
    }

}
