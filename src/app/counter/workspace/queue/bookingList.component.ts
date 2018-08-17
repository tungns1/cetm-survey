import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WorkspaceService } from '../shared';
import { map } from 'rxjs/operators';

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
    count$ = this.list$.pipe(map(data => data.length));

    trackFn(index, item) {
        return item.id;
    }
}