import { Injectable } from '@angular/core';
import { HttpServiceGenerator, ReportFilterService } from '..';
import { BehaviorSubject } from 'rxjs';
import { ShowLoading, HideLoading } from '../../../../lib/backend';
import { IAppointmentDetail, AppointmentPerformance } from '../../appointment-performance/shared/appointment-performance.model';

@Injectable()
export class BookingService {

    constructor(private httpServiceGenerator: HttpServiceGenerator, private filterService: ReportFilterService) { }

    private backend = this.httpServiceGenerator.make<any>("/api/admin");
    private appointmentPerformance = new AppointmentPerformance;
    bookingHistory$ = new BehaviorSubject<IAppointmentDetail[]>([]);


    Refresh(type:string = '') {
        this.backend.Get2<any>('appointment_performance', this.filterService.ToBackendQuery()).subscribe(data => {
        ShowLoading();
            if (data) {
                // console.log(data)
                if (type === 'status') {
                    this.appointmentPerformance.UpdateBookingHistory(data);
                    // console.log(this.appointmentPerformance.SumData)
                    this.bookingHistory$.next(this.appointmentPerformance.BookingHistoryData)
                    // console.log(this.appointmentPerformance.BookingHistoryData)
                }
                // console.log(this.appointmentPerformance)
            }
            HideLoading();
        });

    }

}
