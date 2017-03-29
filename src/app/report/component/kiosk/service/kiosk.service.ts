import { IKioskTrack, InfoKioskTrack } from '../../shared';
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
        this.api.Get<IKioskTrack[]>("effect", this.filterService.ToBackendQuery()).subscribe(v => {
            console.log(v);
            if (v.length > 0) {
                this.RxKioskEff.next(v);
            }

        });
    }
    RxKioskEff = new BehaviorSubject<IKioskTrack[]>([]);
    get RxSummaryView() {
        return this.RxKioskEff.map(InfoKioskTrack.Make);
    };


    api = this.httpServiceGenerator.make<any>("/api/report/kiosk_effect");

}
