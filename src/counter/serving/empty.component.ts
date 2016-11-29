import { Component, OnChanges } from '@angular/core';
import { RxBusy } from '../backend/queue';

@Component({
    selector: 'empty',
    templateUrl: 'empty.component.html',
    styleUrls: ['ticket.component.css']
})
export class EmptyComponent {
    display = RxBusy.map(b => b? 'none': 'block');
}