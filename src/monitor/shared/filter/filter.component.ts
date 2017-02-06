import { Component, Output, EventEmitter } from '@angular/core';
import { IAsideFilter } from './filter';
import { Branch } from '../../../shared/';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'monitor-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class MonitorFilterComponent {
    constructor(private route: ActivatedRoute) {}
    
    active = '';
    @Output() filter = new EventEmitter<IAsideFilter>();
    refresh() {
        this.filter.next({
            branch_id: Branch.SelectedBranchIDLevel0.value
        });
    }
}