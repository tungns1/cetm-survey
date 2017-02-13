import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AggregateService } from '../../shared';

@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.css']
})
export class ReportOverViewComponent {

    constructor(
        private aggregateService: AggregateService
    ) { }

    @Input() tag: string;
    tab = 'general';
    data = this.aggregateService.RxActiveAggregate;
    groupTitle = this.aggregateService.RxGroupTitle;
    ngOnChanges(change) {
        if (change.tag) {
            this.tab = this.tag;
        }
    }
}