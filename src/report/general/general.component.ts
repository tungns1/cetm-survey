import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RxFilter } from '../filter/filter.module';
import { RefreshAggregate } from '../backend/aggregate.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'general',
    templateUrl: 'general.component.html'
})
export class GeneralComponent {
    tag ='general';
    ngOnInit() {
        this.subscription = RxFilter.subscribe(RefreshAggregate);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private subscription: Subscription;

    setActive(tab) {
        this.tag=tab.tag;
    }

}