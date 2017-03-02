import { Component } from '@angular/core';
import { QueueService } from '../service';
@Component({
    selector: 'info-customer',
    templateUrl: 'info.component.html'
})

export class InfoComponent {
    constructor(private queueService: QueueService) { }
    tkserving$ = this.queueService.serving$.map(v=>v[0]);
}