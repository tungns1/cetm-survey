import { Component, OnInit, ViewContainerRef,Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RxFilter } from '../filter/filter.module';
import { RefreshAggregate } from '../backend/aggregate.service';

@Component({
    selector: 'general',
    templateUrl: 'general.component.html'
})
export class GeneralComponent {
    ngOnInit() {
        this.subscription = RxFilter.subscribe(RefreshAggregate);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private subscription: Subscription;

}