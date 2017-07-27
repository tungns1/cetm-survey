import { Component, OnInit } from '@angular/core';
import { QueueService } from '../shared';

@Component({
    selector: 'serving',
    template: `
    <ticket *ngFor="let t of serving$ | async" [ticket]="t"></ticket>
    <empty *ngIf="!(busy$ | async)"></empty>
    `
})
export class ServingComponent {
    constructor(
        private queueService: QueueService
    ) {}

    serving$ = this.queueService.serving$;
    busy$ = this.queueService.busy$;
}