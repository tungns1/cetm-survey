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
        private customerService: MonitorCustomerService,
        private summaryService: MonitorSummaryService,
        private focusService: MonitorFocusService
    ) { }

    selectedTicket: Object;
    isServed: boolean = true;
    customer: ICustomer;
    admin: ICustomer;
    manager: ICustomer;


    ngOnInit() {
        // this.route.params.subscribe(p => {
        //     this.focusService.Branch$.next(p["branch_id"]);
        // });
        this.focusService.enable();
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            const branch_id = this.route.snapshot.params["branch_id"];
            this.focusService.Branch$.next(branch_id);
            this.customerService.GetUserByRoleNBranch(branch_id, 'admin').subscribe(v => {
                this.admin = v;
            });
            this.customerService.GetUserByRoleNBranch(branch_id, 'manager').subscribe(v => {
                this.manager = v;
            });
        });
    }

    ngOnDestroy() {
        this.focusService.disable();
    }

    // chartData: Summary
    focus$ = this.focusService.FocusSummary$;
    counterState$ = this.focusService.counterState$;
    numberCounter$ = this.counterState$.map(v => v.length);
    numberCounterOff$ = this.counterState$
        .map(v => v.filter(v => v.state === 'off').length);
    numberCounterOn$ = this.counterState$
        .map(v => v.filter(v => v.state === 'on').length);

    waiting$ = this.focusService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Waiting) {
                for (let i = 0; i < t.tracks.length; i++) {
                    if (t.tracks[i].state === 'waiting') {
                        t.service_id = t.tracks[i].services[0];
                    }
                }
                return t;
            }
        }))
        .map(tickets => tickets.sort((a, b) => {
            return a.ctime < b.ctime ? -1 : 1;
        }));

    missed$ = this.focusService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Missed) {
                for (let i = 0; i < t.tracks.length; i++) {
                    if (t.tracks[i].state === 'serving') {
                        t.stime = t.tracks[i + 1].mtime - t.tracks[i].mtime;
                        this.addServingTrack(t);
                        return true;
                    }
                }
                t.stime = 0;
                this.addServingTrack(t);
                return true;
            }
        }))
        .map(tickets => tickets.sort((a, b) => {
            return a.ctime < b.ctime ? -1 : 1;
        }));

    waitingAndMissed$ = this.waiting$.combineLatest(this.missed$, (waiting, missed) => {
        return [].concat(waiting).concat(missed);
    })

    serving$ = this.focusService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Serving) {
                this.addServingTrack(t);
                return true;
            }
        }))
        .map(tickets => tickets.sort((a, b) => {
            return a.ctime < b.ctime ? -1 : 1;
        }));

    move$ = this.focusService.tickets$
        .map(tickets => {
            let ts: ITicket[] = [];
            tickets.forEach(t => {
                if (t.state === TicketStates.Finished || t.state === TicketStates.Waiting || t.state === TicketStates.Serving) {
                        for (let i = 0; i < t.tracks.length; i++) {
                            if (t.tracks[i].state === 'finished') {
                                let ticket: ITicket = {
                                    branch_id: t.branch_id,
                                    cnum: t.cnum,
                                    ccount: t.ccount,
                                    customer: t.customer,
                                    priority: t.priority,
                                    ticket_priority: t.ticket_priority,
                                    counter_id: t.tracks[i - 1].counter_id,
                                    mtime: t.tracks[i-1].mtime,
                                    service_id: t.tracks[i - 1].service_id,
                                    user_id: t.tracks[i - 1].user_id,
                                    stime: t.tracks[i].mtime - t.tracks[i - 1].mtime,
                                    id: t.id,                     
                                    services: t.services,
                                    counters: t.counters,                                 
                                    vcode: t.vcode,                             
                                    state: t.state,                                
                                    ctime: t.ctime,                               
                                    tracks: t.tracks,                 
                                }

                                ts.push(ticket);
                            }
                        }

                    }
            })
            return ts;
        }).map(tickets => tickets.sort((a, b) => {
            return a.ctime < b.ctime ? -1 : 1;
        }));




    cancelled$ = this.focusService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Cancelled) {
                this.addServingTrack(t);
                return true;
            }
            return false;
        }))
        .map(tickets => tickets.sort((a, b) => {
            return a.ctime < b.ctime ? -1 : 1;
        }));

    servingNServed$ = this.serving$.combineLatest(this.move$, this.cancelled$, (serving, move, cancelled) => {
        return [].concat(serving).concat(move).concat(cancelled);
    })

    addServingTrack(a: ITicket) {
        const t = <IExtendedTicket>a;
        for (let i = t.tracks.length - 1; i >= 0; i--) {
            if (t.tracks[i].state === 'serving') {
                if (t.state === TicketStates.Serving) {
                    t.service_id = t.tracks[i].service_id;
                    t.counter_id = t.tracks[i].counter_id;
                    t.user_id = t.tracks[i].user_id;
                    t.serving = t.tracks[i];
                    t.state = 'serving';
                    return t;
                } else {
                    t.service_id = t.tracks[i].service_id;
                    t.counter_id = t.tracks[i].counter_id;
                    t.user_id = t.tracks[i].user_id;
                    t.serving = t.tracks[i];
                    return t;
                }

            }
        }

        t.serving = <ITicketTrack>{
            state: TicketStates.Serving,
            //  service_id: t.services[0]
        };
        return t;
    }

    private goBackBranchList() {
        this.router.navigate(["../../summary"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve"
        })
    }
}