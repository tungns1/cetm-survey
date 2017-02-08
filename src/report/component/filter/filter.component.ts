import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { GetServices, GetCounters, GetUsers, RxGroupBy, RxPeriod, Form, GetFilter } from '../../service/filter.service';
import { Branch, SharedConfig } from '../../shared/';


@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class ReportFilterComponent {
    @Output() filter = new EventEmitter();
    form = Form;
    active = '';
    refresh() {
        const filter = GetFilter();
        RxGroupBy.next(filter.group_by);
        RxPeriod.next(filter.period);
        this.filter.next(filter);
    }
}