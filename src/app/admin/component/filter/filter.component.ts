import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminNavService } from '../shared';

@Component({
    selector: 'admin-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterComponent {

    constructor(
        private navService: AdminNavService
    ) { }
    hidden = true;
    refresh() {
        this.navService.Refresh();
    }
}