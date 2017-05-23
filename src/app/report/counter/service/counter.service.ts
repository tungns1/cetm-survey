import { ICounterTrack, IPerformance, InfoPerformanceTrack } from '../../shared';
import { HttpServiceGenerator ,Paging} from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

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
    GetActivity(skip: number, limit: number) {
        const query = Object.assign({
            skip: skip,
            limit: limit
        }, this.filterService.ToBackendQuery());

        return this.api.Get<IActivity>("activity", query);
    }
    pagin(page: number) {
        const skip = paging.SkipForPage(page);
        const limit = paging.Limit;
        this.GetActivity(skip, limit)
            .subscribe(v => {
                paging.SetPage(page);
                paging.Reset(v.data, v.total);
            });
    }
    Search() {
        this.api.Get<IPerformance>("performance", this.filterService.ToBackendQuery()).subscribe(v => {
            if (v!=null) {
                this.RxCounterFerformance.next(v);
            }

        });
    }
      private makeQuery(code: string, id: string) {
        return Object.assign({
            code: code,
            id: id,
        }, this.filterService.ToBackendQuery());
    }
    RxCounterFerformance = new BehaviorSubject<IPerformance>(null);

    get RxPerformanceView() {
        return this.RxCounterFerformance.map(InfoPerformanceTrack.Make);
    };


    api = this.httpServiceGenerator.make<any>("/api/report/counter");

}
