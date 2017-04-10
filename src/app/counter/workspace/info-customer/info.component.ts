import { Component } from '@angular/core';
import { QueueService, ICustomer } from '../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const c = new BehaviorSubject<ICustomer>(null);

@Component({
    selector: 'info-customer',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class InfoComponent {
    constructor(private queueService: QueueService) { }
    customer = c;
    ngOnInit() {
        this.queueService.serving$.map(v => v[0]).subscribe(v => {
            if (v != null) {
                c.next(v.customer);
            }

        });
    }

}  