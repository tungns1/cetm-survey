import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IDevice,
    MonitorFilterService, ModalComponent, TimerComopnent
} from '../../shared';
import { MonitorFocusService } from '../shared';
import { MonitorNavService } from '../../../service/shared/nav';

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html',
    styleUrls: ['focus.component.scss']
})
export class FocusComponent {

    constructor(
        private navService: MonitorNavService,
        private route: ActivatedRoute,
        private router: Router,
        private filterService: MonitorFilterService,
        private deviceService: MonitorFocusService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(p => {
            this.deviceService.Branch$.next(p["branch_id"]);
        });
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            const branch_id = this.route.snapshot.params["branch_id"];
            this.deviceService.Branch$.next(branch_id);
        });

    }

    ngOnDestroy() {

    }

    box$ = this.deviceService.Box$;
    counters$ = this.deviceService.Box$.map(b => b.counters.ToArray());
    kiosks$ = this.deviceService.Box$.map(b => b.kiosks.ToArray());

    private goBackBranchList() {
        this.router.navigate(["../../summary_device"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve"
        })
    }
}