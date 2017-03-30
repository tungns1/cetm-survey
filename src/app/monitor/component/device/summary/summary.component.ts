import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MonitorNavService, MonitorFilterService, IDevice } from '../../shared';
import { MonitorDeviceService } from '../device.service';
import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray } from "lodash";

@Component({
    selector: 'device-summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    constructor(
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private deviceService: MonitorDeviceService
    ) { }

    ngOnInit() {
        this.filterService.Data$.subscribe(filter => {
            let branches: string[] = [];
            if (branches.length < 1) {
                this.message = "Please,choose store";
            }
        });
        this.deviceService.summary$.subscribe(v => {
        
        })
    }

    ngOnDestroy() {

    }
    summary$: IDevice[];
   

    focus(selectedBranch) {
        this.filterService.SetFocus(selectedBranch.branch_id);
    }
    message = '';


}