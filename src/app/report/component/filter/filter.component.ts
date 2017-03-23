import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ReportNavService } from '../shared';

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private navService: ReportNavService
    ) { }

    refresh() {
        this.navService.Refresh$.Next();
    }
}