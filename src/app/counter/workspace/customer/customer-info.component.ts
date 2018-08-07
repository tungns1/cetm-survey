import { Component, Input } from '@angular/core';
import { QueueService, ICustomer, Customer } from '../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'customer-info',
    templateUrl: 'customer-info.component.html',
    styleUrls: ['customer-info.component.scss']
})
export class CustomerInfoComponent {
    constructor(
        private queueService: QueueService
    ) { }
    @Input() customer: Customer;
}  