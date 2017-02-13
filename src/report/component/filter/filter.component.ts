import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ReportFilterService } from '../shared';

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html'
})
export class ReportFilterComponent {
    constructor(
        private filterService: ReportFilterService
    ) { }

    refresh() {
        this.filterService.Refresh();
    }
}