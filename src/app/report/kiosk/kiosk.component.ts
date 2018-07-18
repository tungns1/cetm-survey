import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { KioskAPI } from './service/kiosk.service';
import { MatTabGroup } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
    selector: 'kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class KioskComponent {
    constructor(
           private kioskAPI:KioskAPI
    ) { }

    data$=this.kioskAPI.RxSummaryView;
    paddingTime = this.data$.pipe(map(data => {
        switch (data.time.length){
        case 1:
            return 2000;
        case 2:
            return 500;
        case 3:
            return 200;
        case 4:
            return 50;
        default:
            return 10;
        }
    }));
    paddingTicket = this.data$.pipe(map(data => {
        switch (data.ticket.length){
        case 1:
            return 2000;
        case 2:
            return 500;
        case 3:
            return 200;
        case 4:
            return 50;
        default:
            return 10;
        }
    }));
    selectedTab: number;
    
    onTabChange(e) {
        this.selectedTab = e.index;
    }

    refresh() {
        this.kioskAPI.Search();
    }
}