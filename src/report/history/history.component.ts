import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RxCount, RxHistory, RefreshHistory, ExportHistory } from '../backend/history.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFilter, GetFilter } from '../filter/';
import 'rxjs/add/Observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SetRefresh } from '../backend/';

interface IPage {
    page: number;
    title: string;
}

const pageSize = 15;

const RxCurrentPage = new BehaviorSubject(1);

@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.css']
})
export class HistoryComponent {
    data = RxHistory;
    active: IFilter = null;

    ngOnInit() {
        SetRefresh(this.refresh.bind(this));
    }

    refresh() {
        this.active = GetFilter();
        this.active.limit = pageSize;
        this.active.skip = pageSize * (RxCurrentPage.value - 1);
        RefreshHistory(this.active);
    }

    chuyenTrang(value) {
        RxCurrentPage.next(value);
        this.refresh();
    }

    skip = RxCurrentPage.map(v => (v - 1) * pageSize);
    current = RxCurrentPage;
    info = RxCurrentPage.map(c => `Hiển thị ${pageSize} GD từ số ${(c - 1) * pageSize + 1} đến số ${c * pageSize}`);

    pages = Observable.combineLatest(RxCount, RxCurrentPage, (count, current) => {

        const totalPage: number = Math.ceil(count / 15);

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
        ExportHistory();
    }

}