import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportViewService } from '../../shared';
import { MAIN_TABS } from '../shared';
import { CustomerAPI,max_service,max_store } from '../service/customer.service';
import { Customer, IService, IStore, IFre } from '../../shared/';
@Component({
    selector: 'report-overview',
    templateUrl: 'overview.component.html'
})
export class ReportOverViewComponent {

    constructor(
        private viewService: ReportViewService,
        private customerAPI: CustomerAPI
    ) { }


    ngOnInit() {
        this.customerAPI.RxSummaryView.subscribe(v => {
            this.data = v;
            this.push(v);
        });
    }
    push(v: Customer) {
        this.services=[];
        this.stores=[];
        this.fres=[];
        var v_service = Object.keys(v.services).map(function (k) { return v.services[k] });
        var k_service = Object.keys(v.services);

        for (var i = 0; i < v_service.length; i++) {
            this.services.push({
                name: k_service[i],
                count: v_service[i]
            })
        }
        this.services.sort(function(a,b){
            return a.count - b.count;
        })
        max_service.next(this.services[this.services.length-1]);
        var v_store = Object.keys(v.stores).map(function (k) { return v.stores[k] });
        var k_store = Object.keys(v.stores);

        for (var i = 0; i < v_store.length; i++) {
            this.stores.push({
                name: k_store[i],
                count: v_store[i]
            })
        }
         this.stores.sort(function(a,b){
            return a.count - b.count;
        })
        max_store.next(this.stores[this.stores.length-1]);
        var v_fre = Object.keys(v.fres).map(function (k) { return v.fres[k] });
        var k_fre = Object.keys(v.fres);

        for (var i = 0; i < v_fre.length; i++) {
            this.fres.push({
                name: k_fre[i],
                count: v_fre[i]
            })
        }

    }
    data: Customer;
    tab$ = this.viewService.ValueChanges.map(v => v.GetTab()).share();
    store$ = this.tab$.map(tab => tab === MAIN_TABS.STORE.name);
    time$ = this.tab$.map(tab => tab === MAIN_TABS.TIME.name);
    service$ = this.tab$.map(tab => tab === MAIN_TABS.SERVICE.name);
    frequency$ = this.tab$.map(tab => tab === MAIN_TABS.FREQUENCY.name);
    services: IService[] = [];
    stores: IStore[] = [];
    fres: IFre[]=[];


}