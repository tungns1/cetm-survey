import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkspaceService, ITicket } from '../shared';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'booking-queue',
    templateUrl: 'bookingList.component.html',
    styleUrls: ['queue.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingListComponent {
    constructor(
        private workspaceService: WorkspaceService
    ) { }

    list$ = this.workspaceService.bookingOnlineList$;

    count$ = this.list$.map(data => data.length);
}