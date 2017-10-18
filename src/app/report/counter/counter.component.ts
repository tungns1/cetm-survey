import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { CounterAPI } from './service/counter.service';
import { MatTabGroup } from '@angular/material';
import { ActivityComponent } from './counter-activity/activity.component'

@Component({
    selector: 'counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CounterComponent {
    constructor(
        private counterAPI: CounterAPI
    ) { }

    data$ = this.counterAPI.RxPerformanceView;
    selectedTab = 0;
    @ViewChild(ActivityComponent) countActivity: ActivityComponent;

    refresh() {
        this.counterAPI.Search();
        this.counterAPI.pagin(1);
        // this.countActivity.pagin(1);
    }

    onTabChange(e) {
        this.selectedTab = e.index;
    }

}