import { Component } from '@angular/core';
import { QueueService, ICustomer } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'info-customer',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class InfoComponent {
    constructor(private queueService: QueueService) { }
    customer$ = this.queueService.serving$
        .filter(v => !!v[0]).map(v => v[0].customer);
}  