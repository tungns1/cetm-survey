import { Component, Output, EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    @Input() inside:string;
   
    ngOnInit() {
        this.Refresh();
    }

    Refresh() {
        this.refresh.next(null);
    }

    @Output() refresh = new EventEmitter();
}