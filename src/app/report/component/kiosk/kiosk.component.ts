import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { ReportNavService  } from '../../service/';
import { KioskAPI } from './service/kiosk.service';
import { MdTabGroup } from '@angular/material';
@Component({
    selector: 'kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class KioskComponent {
    constructor(
           private nav: ReportNavService,
           private kioskAPI:KioskAPI
    ) { }

    data$=this.kioskAPI.RxSummaryView;
    paddingTime = this.data$.map(data => {
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
    });
    paddingTicket = this.data$.map(data => {
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
    });
    selectedTab: number;

    ngOnInit() {
        
       this.nav.Refresh$.ExclusiveSubscribe(_ => {
           this.kioskAPI.Search();
        });
    }

    onTabChange(e){
        this.selectedTab = e.index;
    }
    
}