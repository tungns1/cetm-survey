import { IStoreReport, InfoStore } from '../../shared';
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
    RxStoreReport = new BehaviorSubject<IStoreReport>(null);

    get RxStoreView() {
        return this.RxStoreReport.map(InfoStore.Make);
    };


    api = this.httpServiceGenerator.make<any>("/api/report/store");

}
