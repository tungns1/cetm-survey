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

import { combineLatest } from 'rxjs/observable/combineLatest';

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
        // this.box$.subscribe(b => console.log(b));
    }

    ngOnDestroy() {

    }

    // chartData: Summary
    box$ = this.focusService.Box$;

    tickets$ = this.focusService.Box$.map(b => b.tickets).filter(t => !!t);
    serving$ = this.tickets$.switchMap(tickets => tickets.Serving$);
    incomplete$ = this.tickets$.switchMap(tickets => {
        return combineLatest(tickets.Waiting$, tickets.Missed$)
            .map(([waiting, missed]) => {
                // console.log(missed);
                missed.forEach(t => {
                    for(let i = 0; i < t.tracks.length; i++){
                        if(t.tracks[i].state === 'serving' && t.tracks[i - 1].state === 'waiting'){
                            t['waiting_time'] = t.tracks[i].mtime - t.tracks[i - 1].mtime;
                            i = t.tracks.length;
                        }
                    }
                });
                return [].concat(waiting).concat(missed);
            });
    });

    completed$ = this.tickets$.switchMap(tickets => {
        return combineLatest(tickets.Serving$, tickets.Finished$, tickets.Cancelled$)
            .map((queues) => {
                return Array.prototype.concat.apply([], queues);
            });
    })

    private goBackBranchList() {
        this.router.navigate(["../../summary"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve"
        })
    }
}