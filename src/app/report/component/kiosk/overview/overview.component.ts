import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportViewService } from '../../shared';
import { MAIN_TABS } from '../shared';
import { KioskAPI} from '../service/kiosk.service';
import { IKioskTrack} from '../../shared/';
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

    tab$ = this.viewService.Tab$;
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    ticket$ = this.tab$.map(tab => tab === MAIN_TABS.TICKET.name);


}