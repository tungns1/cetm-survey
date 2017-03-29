import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ISummary, Summary, MonitorNavService, MonitorFilterService } from '../../shared';
import { MonitorTicketService } from '../ticket.service';

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    constructor(
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.filterService.Data$.subscribe(filter => {
            let branches: string[] = [];
            if (branches.length < 1) {
                this.message = "Please,choose store";
            }
        });
        this.totalSummary$.subscribe(data => this.total = data );
        this.chartData$.subscribe(data => this.chartData = data )
    }

    ngOnDestroy() {

    }

    focus(selectedBranch) {
        this.filterService.SetFocus(selectedBranch.branch_id);
    }

    message = '';
    total = new Summary();
    chartData;
    summary$ = this.ticketService.summary$;
    totalSummary$ = this.summary$.map(data =>{
        return Summary.Aggregate(data);
    });
    chartData$ = this.summary$.map( data => {
        return Summary.getChartData(data);
    })
}