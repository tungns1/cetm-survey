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


    ngOnInit() {
        this.focus$.subscribe(d => this.data = d[0]);
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

    serving$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Serving) {
                this.addServingTrack(t);
                return true;
            }
        }));

    served$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Waiting || t.state === TicketStates.Missed || t.state === TicketStates.Serving) {
                return false;
            }
            this.addServingTrack(t);
            return true;
        }))
        .map(tickets => tickets.sort((a, b) => {
            return a.state < b.state? 1 : -1;
        }));

    addServingTrack(t: ITicket) {
        t.serving = t.tracks.find(
            track => track.state === TicketStates.Serving
        ) || <Model.House.ITicketTrack>{
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