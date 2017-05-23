import { Component, Output, EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ReportNavService } from '../shared';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    @Input() inside:string;
    constructor(
        private navService: ReportNavService
    ) { }

    refresh() {
        this.navService.Refresh$.Next();
    }
}