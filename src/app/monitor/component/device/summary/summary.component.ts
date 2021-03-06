import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MonitorNavService, MonitorFilterService, IDevice ,DeviceCount} from '../../shared';
import { MonitorSummaryService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
        private router: Router,
        private route: ActivatedRoute,
        private deviceService: MonitorSummaryService
    ) { }

    ngOnInit() {
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            this.deviceService.Branches$.next(
                this.filterService.GetStores()
            );
        });
    }

    focus(s: DeviceCount) {
        this.router.navigate(['../focus', s.branch_id], {
            relativeTo: this.route,
            queryParamsHandling: "merge"
        });
    }

    box$ = this.deviceService.Box$;
    records$ = this.box$.pipe(map(b => b.ToArray()));

}