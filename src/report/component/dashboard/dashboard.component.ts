import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { SetRefresh, RefreshAggregate } from '../../service/';
import { IFilter } from '../filter/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    tag = 'general';
    ngOnInit() {
        SetRefresh(RefreshAggregate);
    }

    setActive(tab) {
        this.tag = tab.tag;
    }

}