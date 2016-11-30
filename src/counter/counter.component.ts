import { Component, OnInit, ApplicationRef, HostBinding, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxCurrentCounter, socket } from './backend/index';

@Component({
    selector: 'app-counter',
    templateUrl: 'counter.component.html',
})
export class CounterComponent {
    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        const branch_code = params['branch_code'];
        const counter_code = params['counter_code'];
        socket.Connect({branch_code, counter_code});
    }

    counter = RxCurrentCounter;
} 