import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { KioskAPI } from '../service/kiosk.service';
import { InfoKioskTrack, IKioskTrack } from '../../shared';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class ReportInfoComponent {
    constructor(
        private kioskAPI: KioskAPI
    ) { }
    infoKiosk: InfoKioskTrack;

    ngOnInit() {
        this.kioskAPI.RxSummaryView.subscribe(v => {
            if (v != null) {
                this.infoKiosk = v
            }
        })

    }

    ngOnDestroy() {

    }
}