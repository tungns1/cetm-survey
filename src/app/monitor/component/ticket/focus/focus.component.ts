import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model, ISummary, Summary, ITicket, MonitorFilterService } from '../../shared';
import { MonitorTicketService } from '../ticket.service';
import { MonitorNavService } from '../../../service/shared/nav';
import { ModalComponent } from '../../../../x/ng/modal/modal.component';
import { TimerComopnent } from '../../../../x/ng/time/timer.component';

const TicketStates = Model.House.TicketStates;

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html'
})
export class FocusComponent {

    @ViewChild("edit") editorRef: ModalComponent;
    @ViewChild(TimerComopnent) wait_long: TimerComopnent;

    constructor(
        private navService: MonitorNavService,
        private route: ActivatedRoute,
        private filterService: MonitorFilterService,
        private ticketService: MonitorTicketService
    ) { }

    selectedTicket: Object;
    isServed: boolean = true;
    data: Summary;
    // waitingCount = 0;


    ngOnInit() {
        this.focus$.subscribe(d => this.data = d[0]);
        // this.waiting$.subscribe(data => this.waitingCount = data.length);
    }

    ngOnDestroy() {

    }

    focus$ = this.filterService.ValueChanges.switchMap(filter => {
        const branch_id = filter.GetFocus()
        return this.ticketService.summary$.map(data => {
            return data.filter(d => d.branch_id === branch_id);
        })
    })

    waiting$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => t.state === TicketStates.Waiting))
        .map(tickets => tickets.sort((a, b) => {
            return a.mtime < b.mtime? -1 : 1;
        }));

    missed$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => t.state === TicketStates.Missed))
        .map(tickets => tickets.sort((a, b) => {
            return a.mtime < b.mtime? -1 : 1;
        }));

    waitingAndMissed$ = this.waiting$.combineLatest(this.missed$, (waiting, missed) => {
        return [].concat(waiting).concat(missed);
    })

    serving$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Serving) {
                this.addServingTrack(t);
                return true;
            }
        }));

    served$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Missed || t.state === TicketStates.Serving) {
                return false;
            }
            if(t.state === TicketStates.Waiting) {
                let flag = 0;
                for(let i = 0; i < t.tracks.length; i++){
                    if(t.tracks[i].state === 'finished'){
                        t.counter_id = t.tracks[i-1].counter_id;
                        t.mtime = t.tracks[i].mtime;
                        t.service_id = t.tracks[i-1].service_id;                      
                        t.counter_id = t.tracks[i-1].counter_id;                      
                        t.user_id = t.tracks[i-1].user_id;
                        t.stime = t.mtime - t.tracks[i-1].mtime;
                        flag++;
                    }
                }
                if(flag == 0) return false;
                else {
                    return true;
                }
            }
            if(t.state === TicketStates.Cancelled) {
                for(let i = 0; i < t.tracks.length; i++){
                    if(t.tracks[i].state === 'serving') {
                        t.stime = t.tracks[i+1].mtime - t.tracks[i].mtime;
                        this.addServingTrack(t);
                        return true;
                    }
                }
                t.stime = 0;
                this.addServingTrack(t);
                return true;
            }
            if(t.state === TicketStates.Finished) {
                t.stime = t.tracks[t.tracks.length - 1].mtime - t.tracks[t.tracks.length - 2].mtime;
            }
            this.addServingTrack(t);
            return true;
        }))
        .map(tickets => tickets.sort((a, b) => {
            return a.state < b.state? 1 : -1;
        }));

    servingNServed$ = this.serving$.combineLatest(this.served$, (serving, served) => {
        return [].concat(serving).concat(served);
    })

    addServingTrack(t: ITicket) {
        for(let i = t.tracks.length - 1; i >= 0; i--){
            if(t.tracks[i].state === 'serving'){
                t.serving = t.tracks[i];
                return t;
            }
        }

        t.serving = <Model.House.ITicketTrack>{
            state: TicketStates.Serving,
        };
        return t;
    }

    private goBackBranchList() {
        this.filterService.SetFocus('');
        this.navService.SyncLink();
    }

    private closeModal() {
        this.selectedTicket = null;
        this.editorRef.Close();
    }

    private detail(ticket) {
        if (ticket.serving) {
            this.isServed = true;
        } else this.isServed = false;
        this.selectedTicket = ticket;
        console.log(this.selectedTicket);
        this.editorRef.Open();
    }
}