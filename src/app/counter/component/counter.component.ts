import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { CounterStateService, SharedService, CounterNavService } from './shared';

@Component({
    selector: 'app-counter',
    templateUrl: 'counter.component.html'
})
export class CounterComponent {
    constructor(
        private stateService: CounterStateService,
        private authService: SharedService.Auth.AuthService,
        private navService: CounterNavService
    ) {

    }

    ngOnInit() {
        this.authService.redirect = "/workspace";
    }

    ngOnDestroy() {

    }

} 