import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ISummary, Summary, IExtendedTicket, TicketStates,
    ICustomer, ITicketTrack, ITicket,
    MonitorFilterService, ModalComponent, TimerComopnent
} from '../../shared';
import { MonitorNavService } from '../../../service/shared/nav';
import {
    MonitorSummaryService,
    MonitorFocusService, MonitorCustomerService
} from '../shared';

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html',
    styleUrls: ['focus.component.scss']
})
export class FocusComponent {

    @ViewChild(TimerComopnent) wait_long: TimerComopnent;

    constructor(
        private navService: MonitorNavService,
        private route: ActivatedRoute,
        private router: Router,
        private filterService: MonitorFilterService,
        private summaryService: MonitorSummaryService,
        private focusService: MonitorFocusService
    ) { }

    selectedTicket: Object;
    isServed: boolean = true;
    customer: ICustomer;

    ngOnInit() {
        // this.route.params.subscribe(p => {
        //     this.focusService.Branch$.next(p["branch_id"]);
        // });
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            const branch_id = this.route.snapshot.params["branch_id"];
            this.focusService.Branch$.next(branch_id);
        });
    }

    ngOnDestroy() {
        
    }

    // chartData: Summary
    box$ = this.focusService.Box$;
    tickets$ = this.focusService.Box$.map(b => b.tickets).filter(t => !!t);
    waiting$ = this.tickets$.switchMap(tickets => tickets.Waiting$);
    serving$ = this.tickets$.switchMap(tickets => tickets.Serving$);
    missed$ = this.tickets$.switchMap(tickets => tickets.Missed$);
    
    private goBackBranchList() {
        this.router.navigate(["../../summary"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve"
        })
    }
}