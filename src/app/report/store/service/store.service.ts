import { IStoreReport, InfoStore,IStoreHour,InfoStoreByHour, InfoServingByWeek, IServingWeek } from '../../shared';
import { HttpServiceGenerator, Paging } from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    Search() {
        this.api.Get<IStoreReport>("read", this.filterService.ToBackendQuery()).subscribe(v => {
            if (v != null) {
                this.RxStoreReport.next(v);
            }
        });
    }
     SearchByHour() {
        this.api.Get<IStoreHour[]>("read_by_hour", this.filterService.ToBackendQuery()).subscribe(v => {
            if (v != null) {
                this.RxStoreReportByHour.next(v);
            }
        });
    }
    SearchByWeek() {
        this.api.Get<IServingWeek[]>("read_by_week", this.filterService.ToBackendQuery()).subscribe(v =>{
            if (v != null) {
                this.RxServingReportByWeek.next(v);
            }
        });
    }
    RxStoreReport = new BehaviorSubject<IStoreReport>(null);

    get RxStoreView() {
        return this.RxStoreReport.map(InfoStore.Make);
    };

    RxStoreReportByHour = new BehaviorSubject<IStoreHour[]>(null);
    RxServingReportByWeek = new BehaviorSubject<IServingWeek[]>(null);

    get RxStoreViewByHour() {
        return this.RxStoreReportByHour.map(InfoStoreByHour.Make);
    };

    get RxServingViewReport() {
        return this.RxServingReportByWeek.map(InfoServingByWeek.Make);
    };

    api = this.httpServiceGenerator.make<any>("/api/report/store");
}
