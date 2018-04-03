import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';
import { ReportFilterService, HttpServiceGenerator } from '../../shared';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';
import { ICusWaitingRes, CustomerWaiting, ICusWaitingData } from './cus-waiting.model';


@Injectable()
export class CusWaitingService {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    private backend = this.httpServiceGenerator.make<any>("/api/report/transaction");
    private CustomerWaiting = new CustomerWaiting;
    // sumData$ = new Subject<IStaffSum>();
    tableData$ = new BehaviorSubject<ICusWaitingData[]>([]);
    // transChart$ = new BehaviorSubject<IStackChart[]>([]);
    // performanceChart$ = new BehaviorSubject<IStackChart[]>([]);

    Refresh() {
        ShowLoading();
        this.backend.Get<ICusWaitingRes>('agg_time', Object.assign(this.filterService.ToBackendQuery(), {mode: 'wtime'})).subscribe(res => {
            if (res && res.data) {
                this.CustomerWaiting.Update(res.data);
                this.tableData$.next(this.CustomerWaiting.TableData);
            }
            HideLoading();
        });

    }
}


