import { IKioskEff, InfoKioskEff } from '../../shared';
import { HttpServiceGenerator } from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { IAggregate, Aggregate } from '../../../model';


@Injectable()
export class KioskAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    Search() {
        this.api.Get<IKioskEff[]>("effect", this.filterService.ToBackendQuery()).subscribe(v => {
            console.log(v);
            this.RxKioskEff.next(v);
        });
    }
    RxKioskEff = new BehaviorSubject<IKioskEff[]>([]);
    get RxSummaryView() {
        return this.RxKioskEff.map(InfoKioskEff.Make);
    };


    api = this.httpServiceGenerator.make<any>("/api/report/kiosk_effect");

}
