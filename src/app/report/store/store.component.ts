import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { StoreAPI } from './service/store.service';
import { MdTabGroup } from '@angular/material';

@Component({
    selector: 'store',
    templateUrl: 'store.component.html',
    styleUrls: ['store.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StoreComponent {
    constructor(
        private storeAPI: StoreAPI
    ) { }

    data$ = this.storeAPI.RxStoreView;
    selectedTab = 0;

    refresh() {
        this.storeAPI.Search();
        this.storeAPI.SearchByHour();
    }

    onTabChange(e) {
        this.selectedTab = e.index;
    }

}