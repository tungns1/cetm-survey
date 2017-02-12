import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminFilterService } from '../shared';

@Component({
    selector: 'admin-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterComponent {

    constructor(
        private route: ActivatedRoute,
        private filterService: AdminFilterService
    ) { }

    refresh() {
        this.filterService.Refresh();
    }
}