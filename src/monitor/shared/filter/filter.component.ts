import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Branch } from '../shared/';
import { Locale } from '../../config/';

export interface IFilter {
    tag?: string;
    branch_id?: string;

}

import { Subject } from 'rxjs/Subject';
export const RxFilter = new Subject<IFilter>();

 

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class ReportFilterComponent {
    filter: IFilter;
    branch_id = Branch.SelectedBranchIDLevel0.value;
    active = '';
    refresh() {
        this.filter.branch_id=this.branch_id;
        RxFilter.next(this.filter);
    }
}