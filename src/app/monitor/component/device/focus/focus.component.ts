import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
        private filterService: MonitorFilterService,
        private deviceService: MonitorFocusService
    ) { }

    selectedTicket: Object;
    isServed: boolean = true;


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
    counter$ = this.deviceService.counter$.map(v => {
        return v;
    })
    kisok$ = this.deviceService.kisok$.map(v => {
        return v;
    })




    private goBackBranchList() {
        this.filterService.SetFocus('');
    }


}