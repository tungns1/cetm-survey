import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportViewService } from '../../shared';
import { KioskAPI} from '../service/kiosk.service';
import { IKioskEff} from '../../shared/';
@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.scss']
})
export class ReportOverViewComponent {

    constructor(
        private viewService: ReportViewService,
        private kioskAPI: KioskAPI
    ) { }


    ngOnInit() {
       
    }


}