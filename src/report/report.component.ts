import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { RefreshHistory } from './backend/history.service';
import { RefreshAggregate } from './backend/aggregate.service';
import { RxFilter, IFilter } from './filter/';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-root',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class ReportComponent {
    hidden = true;
    private subscription: Subscription;
    tonghop() {
        this.subscription = RxFilter.subscribe(RefreshAggregate);

    }
    lichsu() {
        if (!this.subscription) {
            this.subscription = RxFilter.subscribe(ft => {
                RefreshHistory(ft);
            })
        }

    }

    excel() {

    }

    pdf() {

    }

}