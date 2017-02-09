import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { FilterService, AggregateService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    constructor(
        private aggregateService: AggregateService,
        private filterService: FilterService
    ) { }

    tag = 'dashboard';

    ngOnInit() {
        this.filterService.SetRefresh(this.aggregateService.Refresh.bind(this.aggregateService));
    }

    setActive(tab) {
        this.tag = tab.tag;
    }

}