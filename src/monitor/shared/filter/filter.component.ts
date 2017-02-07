import { Component, Output, EventEmitter } from '@angular/core';
import { IAsideFilter } from './filter';
import { Branch } from '../../../shared/';
import { Router } from '@angular/router';

@Component({
    selector: 'monitor-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class MonitorFilterComponent {
    constructor(private router: Router) { }

    active = '';
    @Output() filter = new EventEmitter<IAsideFilter>();
    refresh() {
        const branches = Branch.SelectedBranchIDLevel0.value;
        this.router.navigate(["/ticket/summary", branches]);        
    }
}