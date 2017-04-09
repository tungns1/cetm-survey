import { Component, OnInit } from '@angular/core';
import { QueueService } from '../service';

@Component({

    selector: 'serving',
    template: `
    <ticket *ngFor="let t of serving$ | async" [ticket]="t"></ticket>
    <empty></empty>
    <action></action>
    <div class="divider"></div>
    `,
    styles: [`
    empty {
        height: 210px;
        border: 0px solid;
    }
    .divider{
        margin: 0px;
    }
    `]
})
export class ServingComponent {
    constructor(
        private queueService: QueueService
    ) {}

    serving$ = this.queueService.serving$;
}