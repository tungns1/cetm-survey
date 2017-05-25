import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { CounterAPI } from './service/counter.service';
import { MdTabGroup } from '@angular/material';

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

    refresh() {
        this.counterAPI.Search();
        this.counterAPI.pagin(1);
    }

    onTabChange(e) {
        this.selectedTab = e.index;
    }

}