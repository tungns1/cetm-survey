import { Injectable } from '@angular/core';
import { ReportFilterService, HttpServiceGenerator } from '../../shared';
import { Subject, BehaviorSubject } from 'rxjs';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';
import { AppointmentPerformance, IAppoitmentSum, ITableData, IAppointmentDetail, ResponAppointment } from './appointment-performance.model';
import { IStackChart } from '../../staff-performance/shared/staff-performance.model';

@Injectable()
export class AppointmentService {

    constructor(
        private filterService: ReportFilterService,
        private httpServiceGenerator: HttpServiceGenerator
    ) { }

    private backend = this.httpServiceGenerator.makeBooking<any>("/api/admin");
    private appointmentPerformance = new AppointmentPerformance;
    sumData$ = new Subject<IAppoitmentSum>();
    tableData$ = new BehaviorSubject<ITableData[]>([]);
    genChart$ = new BehaviorSubject<IStackChart[]>([]);
    arrivedChart$ = new BehaviorSubject<IStackChart[]>([]);
    transactionStatusChart$ = new BehaviorSubject<IStackChart[]>([]);
    averageReservationByDayChart$ = new BehaviorSubject<IStackChart[]>([]);


    Refresh() {
        ShowLoading();
        this.backend.Get<ResponAppointment>('appointment_performance', this.filterService.ToBackendWithLimitQuery()).subscribe(data => {
            if (data.tickets.constructor !== Array) {
                data.tickets = []
            }
            if (data.tickets) {
                this.appointmentPerformance.Update(data.tickets);
                this.sumData$.next(this.appointmentPerformance.SumData);
                this.tableData$.next(this.appointmentPerformance.TableData);
                this.genChart$.next(this.appointmentPerformance.GeneralChartData);
                this.arrivedChart$.next(this.appointmentPerformance.TimeArrivedChartData);
                this.transactionStatusChart$.next(this.appointmentPerformance.TransactionStatusChartData);
                this.averageReservationByDayChart$.next(this.appointmentPerformance.AverageReservationByDayChartData)
            }
        });
        HideLoading();
    }
}
