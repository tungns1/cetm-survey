import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from '../shared';

@Component({
    selector: 'app-counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CounterComponent {
    constructor(
        private authService: AuthService
    ) {

    }

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }

} 