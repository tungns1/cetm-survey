import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RxActiveAggregate } from '../backend/aggregate.service';
import { Observable } from 'rxjs/Observable';
import { RxGroupTitle } from '../filter/filter.module';

@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.css']
})
export class ReportOverViewComponent {

    data = RxActiveAggregate;
    groupTitle = RxGroupTitle;

}