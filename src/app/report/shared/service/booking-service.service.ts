import { Injectable } from '@angular/core';
import { HttpServiceGenerator, ReportFilterService, Paging, IUser } from '..';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { ShowLoading, HideLoading } from '../../../../lib/backend';
import { IAppointmentDetail, AppointmentPerformance, IStatus, ResponAppointment, IStackChart, IResponDetail, BookingDetailSumary } from '../../appointment-performance/shared/appointment-performance.model';

import { IBoxTicket } from '../../../monitor/model';
export const paging = new Paging<IAppointmentDetail>();
@Injectable()
export class BookingService {

    constructor(private httpServiceGenerator: HttpServiceGenerator, private filterService: ReportFilterService, ) { }

    private backend = this.httpServiceGenerator.makeBooking<any>("/api/admin");
    private backendUser = this.httpServiceGenerator.make<any>("/api/admin/org/user");
    private appointmentPerformance = new AppointmentPerformance;
    bookingHistory$ = new BehaviorSubject<IAppointmentDetail[]>([]);
    bookingStatus$ = new Subject<IStatus>();
    listManager$ = new Subject<string>();
    bookingStatusTableData$ = new BehaviorSubject<IStatus[]>([]);
    bookingStatusChartData$ = new BehaviorSubject<IStackChart[]>([]);
    bookingStatusReservationChartData$ = new BehaviorSubject<IStackChart[]>([]);
    bookingDetailSumeryData = new Subject<BookingDetailSumary>();
    bookingDetailTicketData = new BehaviorSubject<IResponDetail[]>([]);
    Refresh(type: string = '') {
      
        ShowLoading();
        this.backend.Get<ResponAppointment>('appointment_performance', this.filterService.ToBackendWithLimitQuery()).subscribe(data => {
            if (data) {
                switch(type){
                    case 'history':
                        this.appointmentPerformance.UpdateBookingHistory(data.tickets);
                        this.bookingHistory$.next(this.appointmentPerformance.BookingHistoryData)
                        break;
                    case 'status':
                        this.appointmentPerformance.UpdateBookingStatus(data.tickets)
                        this.bookingStatus$.next(this.appointmentPerformance.BookingStatusData)
                        this.bookingStatusTableData$.next(this.appointmentPerformance.BookingStatusTableData)
                        this.bookingStatusChartData$.next(this.appointmentPerformance.BookingStatusChartData)
                        this.bookingStatusReservationChartData$.next(this.appointmentPerformance.BookingStatusReservationChartData)
                        break;
                }
            }
        });
        HideLoading();
    }
    
    RefreshHistory(skip:number, limit: number){
        let query = Object.assign({
            limit: limit,
            skip: skip
        }, this.filterService.ToBackendQueryBooking())

        return this.backend.Get<ResponAppointment>('appointment_performance', query);
    }


    RefreshDetail(branch_id:string, start:number, end:number){
        ShowLoading();
        this.backend.Get<IResponDetail[]>('booking_detail', this.filterService.ToBackendBookingDetail(branch_id, start, end)).subscribe(data => {
            this.appointmentPerformance.UpdateBookingDetail(data);
            this.bookingDetailSumeryData.next(this.appointmentPerformance.BookingDetailSumary)
            this.bookingDetailTicketData.next(this.appointmentPerformance.BookingDetailTickets)
        })
        HideLoading();
    }

    getStoreManager(branch_id: string){
        let temp:IUser
        if(branch_id !== ''){
            this.backendUser.Get<any>('search', {'branch_id': branch_id}).subscribe(data => {
                this.appointmentPerformance.getBranchManager(data)
                this.listManager$.next(this.appointmentPerformance.getManager);
                // console.log(this.appointmentPerformance.getManager)
            })
        }
    }

}
