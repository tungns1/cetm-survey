import { Component, Input } from '@angular/core';
import { Ticket, TicketStates } from '../../shared';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TicketDetailComponent } from './ticketDetail.component';

@Component({
    selector: "app-completed-ticket",
    templateUrl: "completed.html",
    styleUrls: ['completed.scss']
})
export class CompletedTicketComponent {
    constructor(
        private mdDialog: MdDialog
    ) { }

    @Input("data") set _data(v: Ticket[]) {
        this.data = v || [];
        this.data.forEach(t => this.addHelperField(t));
    };

    data: Ticket[] = [];

    // add user_id, service_id and counter_id 
    // for finished and cancelled ticket
    private addHelperField(t: Ticket) {
        if (t.state == TicketStates.Serving) return;
        const prevTrack = t.getPrevTrack();
        if (!prevTrack) return;

        if (t.state == TicketStates.Finished) {
            t.service_id = prevTrack.service_id;
            t.counter_id = prevTrack.counter_id;
            t.user_id = prevTrack.user_id;
            t['__stime'] = t.mtime - prevTrack.mtime;
            return;
        }

        for (let i = t.tracks.length - 1; i >= 0; i--) {
            const track = t.tracks[i];
            t.counter_id = t.counter_id || track.counter_id;
            t.user_id = t.user_id || track.counter_id;
            t.service_id = track.service_id;
            if (t.service_id) {
                break;
            }
        }
    }

    showDetails(t: Ticket) {
        const config = new MdDialogConfig();
        config.width = '350px';
        config.height = '425px';
        config.data = t;
        const dialog = this.mdDialog.open(TicketDetailComponent, config);
    }
}
