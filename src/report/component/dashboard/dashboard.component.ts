import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService, AggregateService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    constructor(
        private aggregateService: AggregateService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(query => {
            this.aggregateService.Refresh(Object.assign({}, query));
        });
    }
}