import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorFilterService } from '../shared';
import { SummaryComponent } from './summary/summary.component';
import { FocusComponent } from './focus/focus.component';
import { MonitorNavService } from '../../service/shared/nav';
import { MonitorTicketSocket } from './shared';

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html'
})
export class MonitorTicketComponent implements OnInit {
    constructor(
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private socket: MonitorTicketSocket
    ) { }

    ngOnInit() {
        this.socket.onInit();
    }

    ngOnDestroy() {
        this.socket.onDestroy();
    }

    isFocus$ = this.filterService.Data$.map(filter => {
        return filter.focus.length > 0;
    });

}