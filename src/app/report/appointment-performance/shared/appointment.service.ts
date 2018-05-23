import { Injectable } from '@angular/core';
import { ReportFilterService, HttpServiceGenerator } from '../../shared';
// import { AppointmentPerformance, IAppoitmentSum, ITableData } from '';
import { Subject, BehaviorSubject } from 'rxjs';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';
import { AppointmentPerformance, IAppoitmentSum, ITableData } from './appointment-performance.model';
import { IStackChart } from '../../staff-performance/shared/staff-performance.model';

@Injectable()
export class AppointmentService {

    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    private backend = this.httpServiceGenerator.make<any>("/api/admin");
    private appointmentPerformance = new AppointmentPerformance;
    sumData$ = new Subject<IAppoitmentSum>();
    tableData$ = new BehaviorSubject<ITableData[]>([]);
    genChart$ = new BehaviorSubject<IStackChart[]>([]);
    arrivedChart$ = new BehaviorSubject<IStackChart[]>([]);
    transactionStatusChart$ = new BehaviorSubject<IStackChart[]>([]);
    averageReservationByDayChart$ = new BehaviorSubject<IStackChart[]>([]);


    Refresh() {
        this.backend.Get2<any>('appointment_performance', this.filterService.ToBackendQuery()).subscribe(data => {
        ShowLoading();
            if (data) {
                // console.log(data)
                this.appointmentPerformance.Update(data);
                // console.log(this.appointmentPerformance.SumData)
                this.sumData$.next(this.appointmentPerformance.SumData);
                this.tableData$.next(this.appointmentPerformance.TableData);
                this.genChart$.next(this.appointmentPerformance.GeneralChartData);
                this.arrivedChart$.next(this.appointmentPerformance.TimeArrivedChartData);
                this.transactionStatusChart$.next(this.appointmentPerformance.TransactionStatusChartData);
                this.averageReservationByDayChart$.next(this.appointmentPerformance.AverageReservationByDayChartData)
                // console.log(this.appointmentPerformance)
            }
            HideLoading();
        });

    }
}
