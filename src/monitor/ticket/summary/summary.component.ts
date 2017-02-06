import { Component, OnInit } from '@angular/core';
import { RxSummary } from './summary.model';

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html'
})
export class SummaryComponent {
    ngOnInit() {

    }
    data = RxSummary;
}