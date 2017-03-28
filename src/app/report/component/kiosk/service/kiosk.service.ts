import { IKioskEff } from '../../shared';
import {
    ICustomer, HttpServiceGenerator, Paging
} from '../../shared/';
import { ReportFilterService } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { IAggregate, Aggregate } from '../../../model';


export const RxKioskEff = new BehaviorSubject<IKioskEff[]>([]);
@Injectable()
export class KioskAPI {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    Search() {
        this.api.Get<IKioskEff[]>("effect", this.filterService.ToBackendQuery()).subscribe(v => {
            console.log(v);
            RxKioskEff.next(v);
        });
    }

    api = this.httpServiceGenerator.make<any>("/api/report/kiosk_effect");

}
