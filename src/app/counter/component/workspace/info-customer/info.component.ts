import { Component } from '@angular/core';
import { QueueService } from '../service';
import { Model } from '../../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const c = new BehaviorSubject<Model.Org.ICustomer>(null);

@Component({
    selector: 'info-customer',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class InfoComponent {
    constructor(private queueService: QueueService) { }
    customer=c;
    ngOnInit() {
        this.queueService.serving$.map(v => v[0]).subscribe(v => {
            if (v != null) {
                c.next(v.customer);
            }

        });
    }

}  