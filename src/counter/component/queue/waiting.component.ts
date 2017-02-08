import { Component, OnInit } from '@angular/core';
import { Waiting } from '../../service/queue';

@Component({

    selector: 'waiting',
    templateUrl: 'waiting.component.html',
    styleUrls: ['waiting.component.css']
})
export class WaitingComponent {
    tickets = Waiting.RxData;
    count = Waiting.count();
}