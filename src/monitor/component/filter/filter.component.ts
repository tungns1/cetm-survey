import { Component, Output, EventEmitter } from '@angular/core';
import { Branch } from '../../shared/';
import { Router } from '@angular/router';

import { FilterService } from '../../service';

@Component({
    selector: 'monitor-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class MonitorFilterComponent {
    constructor(private filterService: FilterService) { }

    active = '';
    refresh() {
        const branches = Branch.SelectedBranchIDLevel0.value;
        this.filterService.Refresh(branches.split(","));
    }
}