import { InfoKioskTrack, IKioskEffective } from '../../shared';
import { HttpServiceGenerator } from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable()
export class KioskAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    Search() {
        this.api.Get<IKioskEffective>("effect", this.filterService.ToBackendQuery()).subscribe(v => {
            if (v != null) {
                this.RxKioskEff.next(v);
            }

        });
    }
    RxKioskEff = new BehaviorSubject<IKioskEffective>(null);
    get RxSummaryView() {
        return this.RxKioskEff.pipe(map(InfoKioskTrack.Make));
    };


    api = this.httpServiceGenerator.make<any>("/api/report/kiosk_effect");

}
