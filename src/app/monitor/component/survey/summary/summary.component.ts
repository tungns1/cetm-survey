import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid';
import { MonitorSummaryService } from '../shared/monitor-survey.service';
import { TranslateService } from '../../../../shared/util';
import { ChannelFilterService } from '../../filter/channel-filter/channel-filter.service';
import { IFeedbackReport } from '../shared/monitor-survey.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PoorFeedbackModalComponent } from '../poor-feedback-modal/poor-feedback-modal.component';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private monitorSummaryService: MonitorSummaryService,
        private channelFilterService: ChannelFilterService,
        private translateService: TranslateService,
        private mdDialog: MatDialog
    ) { }

    customColors = [
        {
            name: this.translateService.translate('Good'),
            value: '#86d2ff'
        },
        {
            name: this.translateService.translate('Rather'),
            value: '#a0e11e'
        },
        {
            name: this.translateService.translate('Average'),
            value: '#ff8900'
        },
        {
            name: this.translateService.translate('Poor'),
            value: '#ff687e'
        }
    ];

    staffFilter: number = -5;
    stores$ = this.monitorSummaryService.storeReportData$;
    poorFeedback$ = this.monitorSummaryService.poorFeedbackData$;
    otherFeedback$ = this.monitorSummaryService.otherFeedbackData$;
    chartData$ = this.monitorSummaryService.sumChartData$;
    staffReportData$ = this.monitorSummaryService.staffReportData$.pipe(map(data => {
        if (this.staffFilter == 5) return data.slice(0, 5);
        if (this.staffFilter == -5) return data.slice(-5).sort((a, b) => a.average_point - b.average_point);
        return data;
    }));

    selectedChannel: string[] = [];

    cellclass: string[] = ['padding-10', 'center'];
    gridOptions: GridOptions = {
        rowHeight: 35,
        onCellClicked: (e) => {
            if (e.data.actor) {
                this.router.navigate(['../detail', e.data.actor], {
                    relativeTo: this.route,
                    queryParamsHandling: "merge"
                });
            }
        },
        onGridSizeChanged: () => {
            this.gridOptions.api.sizeColumnsToFit();
        }
    };

    gridOption1: GridOptions = {
        rowHeight: 35,
        onCellClicked: (e) => {
            if (e.event.target['localName'] === 'img')
                this.showDetailPoorFeedback(e.data);
        },
        onGridSizeChanged: () => {
            this.gridOption1.api.sizeColumnsToFit();
        }
    };

    gridOption2: GridOptions = {
        rowHeight: 35,
        onCellClicked: (e) => {
            if (e.event.target['localName'] === 'img')
                this.showDetailPoorFeedback(e.data);
        },
        onGridSizeChanged: () => {
            this.gridOption2.api.sizeColumnsToFit();
        }
    };


    detailCellRenderer(d) {
        if (d.data)
            return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
        else return '';
    }

    showDetailPoorFeedback(data: IFeedbackReport) {
        const config = new MatDialogConfig();
        config.width = '700px';
        config.data = { data: data, isStoreChannel: this.monitorSummaryService.isStoreChannel$.value };
        const dialog = this.mdDialog.open(PoorFeedbackModalComponent, config);
    }

    ngOnInit() {
        this.channelFilterService.Data$.subscribe(data => {
            if (data.channel) {
                this.selectedChannel = data.channel;
            }
        })
    }

    setLabelFormatting = (label) => this.chartData$.value.find(el => el.name === label).value;

    onFilterChange() {
        this.monitorSummaryService.staffReportData$.next(this.monitorSummaryService.staffReportData$.value);
    }

}
