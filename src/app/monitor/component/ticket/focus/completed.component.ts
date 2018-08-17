import { Component, Input } from '@angular/core';
import { Ticket, TicketStates, CacheService, CacheCounter, CacheUsers } from '../../shared';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TicketDetailComponent } from './ticketDetail.component';
import { ProjectConfig } from '../shared';
import { GridOptions } from 'ag-grid';
import { LocalDayTimePipe } from '../../../../x/ng/time/localDayTime'
import { TimeDurationPipe } from '../../../../x/ng/time/timeDuration'
import { TicketIconComponent } from '../../../../shared/businessQapp/ticket-icon.component';

@Component({
    selector: "app-completed-ticket",
    templateUrl: "completed.component.html",
    // styleUrls: ['completed.scss']
})
export class CompletedTicketComponent {
    constructor(
        private mdDialog: MatDialog
    ) { }

    @Input("data") set _data(v: Ticket[]) {
        this.data = v || [];
        this.data.forEach(t => this.addHelperField(t));
    };

    data: Ticket[] = [];
    
    maxServingMinute = ProjectConfig.service.max_serving_minute;
    gridOptions: GridOptions = {
        rowHeight: 35,
        rowSelection: 'multiple',
        paginationPageSize: 12,
        pagination: true,
        getRowStyle: (e) => {
            if (e.data.state === 'finished') {
                return {
                    color: '#00a3ff'
                }
            }
            if (e.data.state === 'cancelled') {
                return {
                    color: '#ff5858'
                }
            }
        },
        onCellClicked: (e) => {
            if (e.event.target['localName'] === 'img')
                this.showDetails(e.data);
        }
    };
    ticketIconNumber = TicketIconComponent;
    cellClass: string[] = ['padding-10', 'center'];

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

    detailCellRenderer(d) {
        if (d.data)
            return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
        else return '';
    }

    noCellRenderer(d) {
        return d.rowIndex + 1;
    }

    serviceCellRenderer(d) {
        if (d.data.service_id)
            return CacheService.ServiceName(d.data.service_id);
        else return '';
    }

    counterCellRenderer(d) {
        if (d.data.counter_id)
            return CacheCounter.GetByID(d.data.counter_id).name;
        else return '';
    }

    userCellRenderer(d) {
        if (d.data.user_id && CacheUsers.GetByID(d.data.user_id))
            return CacheUsers.GetByID(d.data.user_id).fullname;
        else return '';
    }

    printTimeCellRendered(d) {
        let localDayTime = new LocalDayTimePipe();
        return localDayTime.transform(d.data.ctime);
    }

    waitingTimeCellRendered(d) {
        let timeDuration = new TimeDurationPipe();
        return timeDuration.transform(d.data.mtime - d.data.ctime);
    }

    servingTimeCellRenderer(d) {
        if (d.data.state === 'finished') {
            let timeDuration = new TimeDurationPipe();
            return timeDuration.transform(d.data.__stime);
        }
        if (d.data.state === 'cancelled') {
            return '00:00:00';
        }
    }

    showDetails(t: Ticket) {
        const config = new MatDialogConfig();
        config.width = '350px';
        config.data = t;
        const dialog = this.mdDialog.open(TicketDetailComponent, config);
    }
}
