import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';
import { ReportFilterService, HttpServiceGenerator } from '../../shared';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';
import { IStaffReport, StaffPerformanceReport, IStaffSum, IStaffDetail, IStackChart } from './staff-performance.model';


@Injectable()
export class StaffPerformanceService {
    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    private backend = this.httpServiceGenerator.make<any>("/api/report/staff");
    private StaffPerformance = new StaffPerformanceReport;
    sumData$ = new Subject<IStaffSum>();
    tableData$ = new BehaviorSubject<IStaffDetail[]>([]);
    transChart$ = new BehaviorSubject<IStackChart[]>([]);
    performanceChart$ = new BehaviorSubject<IStackChart[]>([]);

    Refresh() {
        this.backend.Get2<IStaffReport>('staff_performance', this.filterService.ToBackendQuery()).subscribe(data => {
        ShowLoading();
            if (data) {
                console.log(data)
                this.StaffPerformance.Update(data);
                this.sumData$.next(this.StaffPerformance.SumData);
                this.tableData$.next(this.StaffPerformance.TableData);
                this.transChart$.next(this.StaffPerformance.TransactionChartData);
                this.performanceChart$.next(this.StaffPerformance.PerformanceChartData);
                // console.log(this.StaffPerformance)
            }
            HideLoading();
        });

    }
}


