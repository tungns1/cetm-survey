import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { CounterStateService, CounterNavService } from './shared';
import { AuthService } from '../shared';

@Component({
    selector: 'app-counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.scss']
})
export class CounterComponent {
    constructor(
        private stateService: CounterStateService,
        private authService: AuthService,
        private navService: CounterNavService
    ) {

    }

    ngOnInit() {
        this.authService.redirect = "/workspace";
    }

    ngOnDestroy() {

    }

} 