import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorFocusService } from '../shared';
import { MonitorNavService } from '../../../service/shared/nav';
import { map } from 'rxjs/operators';

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
    counters$ = this.deviceService.Box$.pipe(map(b => b.counters.ToArray()));
    kiosks$ = this.deviceService.Box$.pipe(map(b => b.kiosks.ToArray()));

    goBackBranchList() {
        this.router.navigate(["../../summary_device"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve"
        })
    }
}