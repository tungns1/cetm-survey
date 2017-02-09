import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { RxGroupBy, RxPeriod, FilterService } from '../../service/';
import { Branch, SharedConfig } from '../../shared/';



@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class ReportFilterComponent {
    constructor(
        private filterService: FilterService
    ) { }

    get Filter() {
        return this.filterService.CurrentFilter;
    }

    @Output() filter = new EventEmitter();

    form = (new FormBuilder).group({
        period: [this.Filter.period],
        start: [this.Filter.start],
        end: [this.Filter.end]
    });

    ngOnInit() {
        this.filterService.SetFormValue(this.form.value);
    }

    active = '';
    refresh() {
        const filter = this.filterService.SetFormValue(this.form.value);
        RxGroupBy.next(filter.group_by);
        RxPeriod.next(filter.period);
        this.filter.next(filter);
    }
}