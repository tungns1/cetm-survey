import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/service/booking-service.service';
import { AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-booking-history',
    templateUrl: './booking-history.component.html',
    styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {

    constructor(private bookingService: BookingService) { }

    data$ = this.bookingService.bookingHistory$;
    dataTable: any;
    ngOnInit() {
        this.data$.subscribe(data => {
            this.dataTable = data.map((item, index) => {
                console.log(item)
                item['no'] = index+1;
                return item;
            })
        })
    }
    refresh(e) {
        this.bookingService.Refresh('status');
    }
}
