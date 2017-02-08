import { Component, OnInit } from '@angular/core';
import { Serving } from '../../service/queue';

@Component({

    selector: 'serving',
    template: `
    <ticket *ngFor="let t of tickets | async" [ticket]="t"></ticket>
    <empty></empty>
    <action></action>
    <hr style="margin: 10px;">
    `,
    styles: [`
    empty {
        height: 210px;
        border:0px solid;
    }
    `]
})
export class ServingComponent {
    tickets = Serving.RxData;
}