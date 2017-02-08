import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Refresh } from '../service/';
import { RxFilter, IFilter } from '../service/filter.service';

@Component({
    selector: 'app-root',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class ReportComponent {
    hidden = true;
    setFilter(filter: IFilter) {
        Refresh(filter);
    }

    excel() {

    }

    pdf() {

    }

}