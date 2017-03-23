import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminNavService } from '../shared';

@Component({
    selector: 'admin-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterComponent {

    constructor(
        private route: ActivatedRoute,
        private navService: AdminNavService
    ) { }

    hidden = true;
    
    refresh() {
        this.navService.Refresh$.next(null);
    }
}