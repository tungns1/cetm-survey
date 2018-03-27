import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReportFilterService, HttpServiceGenerator } from '../../shared';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';
import { IStaffReport, StaffPerformanceReport, IStaffSum, IStaffDetail } from './staff-performance.model';
import { Subject } from 'rxjs';


@Injectable()
export class StaffPerformanceService {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    private backend = this.httpServiceGenerator.make<any>("/api/report/staff");
    private StaffPerformance = new StaffPerformanceReport;
    sumData$ = new Subject<IStaffSum>();
    tableData$ = new Subject<IStaffDetail[]>();

    Refresh() {
        ShowLoading();
        this.backend.Get<IStaffReport>('staff_performance', this.filterService.ToBackendQuery()).subscribe(data => {
            if (data) {
                this.StaffPerformance.Update(data);
                this.sumData$.next(this.StaffPerformance.SumData);
                this.tableData$.next(this.StaffPerformance.TableData);
            }
            HideLoading();
        });

    }
}


