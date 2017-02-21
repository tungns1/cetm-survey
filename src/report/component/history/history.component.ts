
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ITransactionView } from '../../model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/Observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReportFilterService } from '../../service/';
import { TransactionHistoryApi } from './history.service';
import { Ng } from '../../../x/';

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

    paging = this.transactionHistoryApi.Paging;
    // @ViewChild(Ng.ModalComponent) protected detail: Ng.ModalComponent;
    // url_audio = '';
    // ts: ITransactionView;
    // active: any = {};

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.transactionHistoryApi.Refresh(filter);
        });
    }

    chuyenTrang(page: number) {
        this.paging.MoveToPage(page);
        this.transactionHistoryApi.Refresh(this.filterService.Current);
    }

    excel() {
        this.transactionHistoryApi.ExportHistory(this.filterService.Current);
    }

    // Detail(ts: ITransactionView) {
    //     this.ts = ts;
    //     this.detail.Open();
    // }

    // Close() {
    //     this.detail.Close();
    //     this.Pause(this.ts);
    // }

    // Listen(ts: ITransactionView) {
    //     if (this.ts) {
    //         this.Pause(this.ts);
    //     }
    //     this.ts = ts;
    //     ts.check = true;
    //     var audio = new Audio(ts.linkaudio);
    //     audio.play();
    // }

    // Pause(ts: ITransactionView) {
    //     ts.check = false;
    //     var audio = new Audio(ts.linkaudio);
    //     audio.pause();
    // }

}
