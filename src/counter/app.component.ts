import { Component, OnInit, ApplicationRef, HostBinding, Input } from '@angular/core';
import { RxCurrentCounter } from './backend/index';

@Component({

    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    counter = RxCurrentCounter;
} 