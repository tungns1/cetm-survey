import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model, ISummary, Summary, ITicket, MonitorFilterService } from '../../shared';
import { MonitorTicketService } from '../ticket.service';
import { MonitorNavService } from '../../../service/shared/nav';
import { ModalComponent } from '../../../../x/ng/modal/modal.component';
import { TimerComopnent } from '../../../../x/ng/time/timer.component';
// import { ReportChartComponent } from '../../chart/chart.component';

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
        private ticketService: MonitorTicketService,
        private ref: ElementRef
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

    private test(){
        var temp = (this.ref.nativeElement).parentElement;
        // this.ref.nativeElement;
        // console.log(temp);
        // console.log(this.wait_long);
    }

    private goBackBranchList() {
        this.filterService.SetFocus('');
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