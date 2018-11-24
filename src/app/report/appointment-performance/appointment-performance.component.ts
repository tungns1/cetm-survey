import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './shared/appointment.service';

@Component({
    selector: 'app-appointment-performance',
    templateUrl: './appointment-performance.component.html',
    styleUrls: ['./appointment-performance.component.scss']
})
export class AppointmentPerformanceComponent implements OnInit {

    constructor(private appointmentService: AppointmentService) { }
    sumData$ = this.appointmentService.sumData$;
    tableData$ = this.appointmentService.tableData$;
    genChart$ = this.appointmentService.genChart$;
    arrivedChart$ = this.appointmentService.arrivedChart$;
    transactionStatusChart$ = this.appointmentService.transactionStatusChart$;
    averageReservationByDayChart$ = this.appointmentService.averageReservationByDayChart$;
    selectedTab = 0;

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

    onTabChange(e) {
        this.selectedTab = e.index;
    }

    refresh() {
        this.appointmentService.Refresh();
    }
}
