import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { NavService } from '../shared';

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private navService: NavService
    ) { }

    refresh() {
        this.navService.SyncFilter();
    }
}