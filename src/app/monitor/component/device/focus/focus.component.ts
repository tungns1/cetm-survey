import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ISummary, Summary, IExtendedTicket, TicketStates,
    ICustomer, ITicketTrack, ITicket,
    MonitorFilterService, ModalComponent, TimerComopnent
} from '../../shared';
import { MonitorDeviceService } from '../device.service';
import { MonitorNavService } from '../../../service/shared/nav';

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html',
    styleUrls: ['focus.component.scss']
})
export class FocusComponent {

    constructor(
        private navService: MonitorNavService,
        private route: ActivatedRoute,
        private filterService: MonitorFilterService,
        private deviceService: MonitorDeviceService
    ) { }

    selectedTicket: Object;
    isServed: boolean = true;
    data: Summary;
    customer: ICustomer;


    ngOnInit() {
        this.focus$.subscribe(d => this.data = d[0]);

    }

    ngOnDestroy() {

    }

    focus$ = this.filterService.Data$.switchMap(filter => {
        const branch_id = filter.focus;
        return this.deviceService.summary$.map(data => {
            // return data.filter(d => d.branch_id === branch_id);
        })
    })



    private goBackBranchList() {
        this.filterService.SetFocus('');
    }


}