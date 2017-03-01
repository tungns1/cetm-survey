import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model, ISummary, ITicket, MonitorFilterService } from '../../shared';
import { MonitorTicketService } from '../ticket.service';
import { MonitorNavService } from '../../../service/shared/nav';
import { ModalComponent } from '../../../../x/ng/modal/modal.component';

const TicketStates = Model.House.TicketStates;

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html'
})
export class FocusComponent {

    @ViewChild("edit") editorRef: ModalComponent;

    constructor(
        private navService: MonitorNavService,
        private route: ActivatedRoute,
        private filterService: MonitorFilterService,
        private ticketService: MonitorTicketService
    ) { }

    selectedTicket: Object;
    isServed: boolean = true;

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }

    printed(s: ISummary) {
        return s.waiting + s.serving + s.missed + s.finished + s.cancelled;
    }

    focus$ = this.filterService.ValueChanges.switchMap(filter => {
        const branch_id = filter.GetFocus()
        return this.ticketService.summary$.map(data => {
            return data.filter(d => d.branch_id === branch_id);
        })
    })

    waiting$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => t.state === TicketStates.Waiting));
    served$ = this.ticketService.tickets$
        .map(tickets => tickets.filter(t => {
            if (t.state === TicketStates.Waiting) {
                return false;
            }
            this.addServingTrack(t);
            return true;
        }));

    addServingTrack(t: ITicket) {
        t.serving = t.tracks.find(
            track => track.state === TicketStates.Serving
        ) || <Model.House.ITicketTrack>{
            state: TicketStates.Serving,
        };
        return t;
    }

    private closeModal() {
        this.selectedTicket = null;
        this.editorRef.Close();
    }

    private detail (ticket) {
        if(ticket.serving){
            this.isServed = true;
        } else this.isServed = false;
        this.selectedTicket = ticket;
        console.log(this.selectedTicket);
        this.editorRef.Open();
    }
}