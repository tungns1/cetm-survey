import { Component, OnInit, ViewContainerRef, Input, ViewEncapsulation } from '@angular/core';
import { ReportNavService  } from '../../service/';
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
           private nav: ReportNavService,
           private storeAPI:StoreAPI
    ) { }
    data$=this.storeAPI.RxStoreView;
    selectedTab=0;

    ngOnInit() {
        
       this.nav.Refresh$.ExclusiveSubscribe(_ => {
            this.storeAPI.Search();
        });
    }

    onTabChange(e){
        this.selectedTab = e.index;
    }
    
}