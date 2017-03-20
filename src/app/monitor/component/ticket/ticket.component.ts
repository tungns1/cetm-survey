import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorFilterService } from '../shared';
import { MonitorTicketService } from './ticket.service';
import { SummaryComponent } from './summary/summary.component';
import { FocusComponent } from './focus/focus.component';
import { MonitorNavService } from '../../service/shared/nav';

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html'
})
export class MonitorTicketComponent implements OnInit {
    constructor(        
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.ticketService.onInit();
    }

    ngOnDestroy() {
        this.ticketService.onDestroy();
    }

    isFocus$ = this.filterService.ValueChanges.map(filter => {
        return filter.GetFocus().length > 0;
    });

}