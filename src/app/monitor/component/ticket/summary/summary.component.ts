import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ISummary, Summary, AppStorage,
    MonitorNavService, MonitorFilterService, CacheBranch
} from '../../shared';
import { MonitorSummaryService, ProjectConfig } from '../shared';
import { GridOptions } from "ag-grid";
import { share, map } from 'rxjs/operators';

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

    records$ = this.summaryService.summaries$.pipe(map(s => s.ToArray()),share());
    total$ = this.summaryService.summaries$.pipe(map(s => s.GetTotal()));

    gridOptions: GridOptions = {
        rowHeight: 35,
        // floatingBottomRowData: [],
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
        this.records$.subscribe(records => {
            records.forEach(r => {
                if (r.branch_id) {
                    r['store'] = CacheBranch.GetNameForID(r.branch_id);
                    r['exceededWaitingCell'] = r.wait_long + ' (' + r.w_l_percent + '%)';
                    r['exceededServingCell'] = r.serve_long + ' (' + r.s_l_percent + '%)';
                }
            })
        })
        this.total$.subscribe(t => {
            if (!t || !this.gridOptions.api) { return; }
            if (AppStorage.Culture === 'vi')
                t['store'] = 'Tổng cộng';
            if (AppStorage.Culture === 'sp')
                t['store'] = 'Sesumen';
            else
                t['store'] = 'Summary';
            t['exceededWaitingCell'] = t.wait_long + ' (' + t.w_l_percent + '%)';
            t['exceededServingCell'] = t.serve_long + ' (' + t.s_l_percent + '%)';
            setTimeout(_ => {
                var agRow = document.getElementsByClassName('ag-floating-bottom')[0].getElementsByClassName('ag-row')[2];
                if (agRow) {
                    var sumExceededWaiting = agRow.getElementsByClassName('ag-cell');
                    if (t.w_l_percent > ProjectConfig.service.wait_long_alert_percent) {
                        sumExceededWaiting[6]['style'].backgroundColor = '#ff5858';
                        sumExceededWaiting[6]['style'].color = '#fff';
                    } else {
                        sumExceededWaiting[6]['style'].backgroundColor = '#f0f0f0';
                        sumExceededWaiting[6]['style'].color = '#222';
                    }
                    var sumExceededServing = agRow.getElementsByClassName('ag-cell');
                    if (t.s_l_percent > ProjectConfig.service.serve_long_alert_percent) {
                        sumExceededServing[7]['style'].backgroundColor = '#ff5858';
                        sumExceededServing[7]['style'].color = '#fff';
                    } else {
                        sumExceededServing[7]['style'].backgroundColor = '#f0f0f0';
                        sumExceededServing[7]['style'].color = '#222';
                    }
                }
            });
            this.gridOptions.api.setFloatingBottomRowData([t]);
            this.gridOptions.api.getFloatingBottomRow(0).canFlower = true;
        });
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

    export() {
        var params = {
            skipHeader: false,
            allColumns: true,
            suppressQuotes: false,
            fileName: 'overviewTransaction.csv',
        };
        console.log(this.gridOptions.api.getDataAsCsv(params));
        this.gridOptions.api.exportDataAsCsv(params);
    }
}