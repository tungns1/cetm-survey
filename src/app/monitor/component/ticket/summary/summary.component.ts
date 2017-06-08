import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ISummary, Summary,
    MonitorNavService, MonitorFilterService, CacheBranch
} from '../../shared';
import { MonitorSummaryService, ProjectConfig } from '../shared';
import { GridOptions } from "ag-grid";

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private summaryService: MonitorSummaryService,

    ) { }

    records$ = this.summaryService.summaries$.map(s => s.ToArray()).share();
    total$ = this.summaryService.summaries$.switchMap(s => s.Total$);

    private gridOptions: GridOptions = {
        rowHeight: 35,
        floatingBottomRowData: [],
        getRowStyle: (e) => {

        },
        onCellClicked: (e) => {
            if (e.data.branch_id) {
                this.router.navigate(['../focus', e.data.branch_id], {
                    relativeTo: this.route,
                    queryParamsHandling: "merge"
                });
            }
        }
    };

    ngOnInit() {
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            this.summaryService.Branches$.next(
                this.filterService.GetStores()
            );
        });
        this.total$.subscribe(t => {
            this.gridOptions.api.setFloatingBottomRowData([t]);
            this.gridOptions.api.getFloatingBottomRow(0).canFlower;
        });
    }

    storeCellRenderer(d) {
        if (d.data.branch_id)
            return CacheBranch.GetNameForID(d.data.branch_id);
        else return 'Summary';
    }

    exceededWaitingCellRenderer(d) {
        return '<span>' + d.data.wait_long + ' (' + d.data.w_l_percent + '%)</span>';
    }

    warningExceededWaiting(d) {
        if (d.data.branch_id) {
            if (d.data.w_l_percent > ProjectConfig.service.wait_long_alert_percent) {
                return {
                    backgroundColor: '#ff5858',
                    color: '#fff'
                }
            }
        }
    }
    /////////////////////////////////////
    exceededServingCellRenderer(d) {
        return '<span>' + d.data.serve_long + ' (' + d.data.s_l_percent + '%)</span>';
    }

    warningExceededServing(d) {
        if (d.data.branch_id) {
            if (d.data.s_l_percent > ProjectConfig.service.serve_long_alert_percent) {
                return {
                    backgroundColor: '#ff5858',
                    color: '#fff'
                }
            }
        }
    }

    focus(s: ISummary) {
        this.router.navigate(['../focus', s.branch_id], {
            relativeTo: this.route,
            queryParamsHandling: "merge"
        });
    }
}