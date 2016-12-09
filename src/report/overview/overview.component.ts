import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { RxActiveAggregate } from '../backend/aggregate.service';
import { Observable } from 'rxjs/Observable';
import { RxGroupTitle } from '../filter/filter.module';

@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.css']
})
export class ReportOverViewComponent {
    @Input() tag: string;
    tab = 'general';
    data = RxActiveAggregate;
    groupTitle = RxGroupTitle;
    ngOnChanges(change) {
        if (change.tag) {
           this.tab=this.tag;
        }
    }
}