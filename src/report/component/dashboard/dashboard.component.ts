import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { SetRefresh, AggregateService } from '../../service/';
import { IFilter } from '../filter/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    constructor(
        private aggregateService: AggregateService
    ) { }

    tag = 'dashboard';
    
    ngOnInit() {
        SetRefresh(this.aggregateService.Refresh.bind(this.aggregateService));
    }

    setActive(tab) {
        this.tag = tab.tag;
    }

}