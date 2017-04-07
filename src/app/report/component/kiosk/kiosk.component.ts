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

    ngOnInit() {
        
       this.nav.Refresh$.ExclusiveSubscribe(_ => {
           this.kioskAPI.Search();
        });
    }
    data$=this.kioskAPI.RxSummaryView;
    
}