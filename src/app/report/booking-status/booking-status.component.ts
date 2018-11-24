import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/service/booking-service.service';

@Component({
    selector: 'app-booking-status',
    templateUrl: './booking-status.component.html',
    styleUrls: ['./booking-status.component.scss']
})
export class BookingStatusComponent implements OnInit {

    constructor(private bookingService: BookingService) { }
    sumData$ = this.bookingService.bookingStatus$;
    tableData$ = this.bookingService.bookingStatusTableData$;
    reservationChartData$ = this.bookingService.bookingStatusChartData$;
    reservationCancelChartData$ = this.bookingService.bookingStatusReservationChartData$;
    selectedTab:number = 0;
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    timeline = true;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // line, area
    autoScale = true;
    ngOnInit() {
    }
    refresh(){
        this.bookingService.Refresh('status')
    }
    onTabChange(e) {
        this.selectedTab = e.index
    }
}
