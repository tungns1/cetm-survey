import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FilterService } from '../service/';
import { IFilter } from '../service/filter.service';

@Component({
    selector: 'app-root',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class ReportComponent {

    constructor(
        private fitlerService: FilterService
    ) { }

    hidden = true;
    setFilter(filter: IFilter) {
        this.fitlerService.Refresh(filter);
    }

    excel() {

    }

    pdf() {

    }

}