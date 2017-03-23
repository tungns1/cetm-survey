import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SmallStorage, RouterQueryStorageStrategy } from '../../shared';

interface IReportView {
    tab: string;
}

@Injectable()
export class ReportViewService extends SmallStorage<IReportView> {
    constructor(
        storageStrategy: RouterQueryStorageStrategy
    ) {
        super("report_view", storageStrategy);
        this.SetTab();
    }

    SetTab(tab: string = 'general') {
        this.data.tab = tab;
        this.SaveData();
    }

    Tab$ = this.Data$.map(d => d.tab).share();
}