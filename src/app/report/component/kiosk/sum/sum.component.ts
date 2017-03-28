import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IKioskEff } from '../../shared/';
import { KioskAPI } from '../service/kiosk.service';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html'
})
export class ReportSumComponent {
    constructor(
        private customerAPI: KioskAPI
    ) { }


    ngOnInit() {
    
    }

    ngOnDestroy() {

    }


}