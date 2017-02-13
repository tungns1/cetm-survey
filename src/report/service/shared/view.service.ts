import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Model } from '../../shared';

export class ReportView extends Model.SharedModel.AbstractState {
    private tab: string;

    FromQuery(p: Params) {
        this.tab = p['tab'];
    }

    ToQuery() {
        return { tab: this.tab };
    }

    SetTab(tab: string) {
        this.tab = tab;
    }

    GetTab() {
        return this.tab;
    }
}

@Injectable()
export class ReportViewService extends Model.SharedModel.AbstractStateService<ReportView> {
    constructor(
        route: ActivatedRoute
    ) {
        super(route);
        this.onInit(new ReportView);
    }

    SetTab(tab: string) {
        this.state.SetTab(tab);
        this.triggerChange();
    }
}