import { ICounterTrack, IPerformance, InfoPerformanceTrack } from '../../shared';
import { HttpServiceGenerator, Paging } from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';
import { map } from 'rxjs/operators';

export const paging = new Paging<ICounterTrack>();
export interface IActivity {
    data: ICounterTrack[];
    total: number;
}
@Injectable()
export class CounterAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }
    private makeQuery(code: string, id: string) {
        return Object.assign({
            code: code,
            id: id,
        }, this.filterService.ToBackendQuery());
    }
    RxCounterFerformance = new BehaviorSubject<IPerformance>(null);

    get RxPerformanceView() {
        return this.RxCounterFerformance.pipe(map(InfoPerformanceTrack.Make));
    };


    api = this.httpServiceGenerator.make<any>("/api/report/counter");

    GetActivity(skip: number, limit: number) {
        const query = Object.assign({
            skip: skip,
            limit: limit
        }, this.filterService.ToBackendQuery());

        return this.api.Get<IActivity>("activity", query);
    }
    pagin(page: number) {
        ShowLoading();
        const skip = paging.SkipForPage(page);
        const limit = paging.Limit;
        this.GetActivity(skip, limit)
            .subscribe(v => {
                paging.SetPage(page);
                paging.Reset(v.data, v.total);
                HideLoading();
            });
    }
    Search() {
        ShowLoading();
        this.api.Get<IPerformance>("performance", this.filterService.ToBackendQuery()).subscribe(v => {
            if (v != null) {
                this.RxCounterFerformance.next(v);
                HideLoading();
            }

        });
    }

    exportCSV() {
        /* counter activity - export csv */
        const query = Object.assign({}, this.filterService.ToBackendQuery());
        const url = this.api.MakeURL("export_csv", query);
        window.open(url, "_blank");
    }
}
