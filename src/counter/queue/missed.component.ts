import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Missed } from '../backend/queue';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({

    selector: 'missed',
    templateUrl: 'missed.component.html',
    styleUrls: ['waiting.component.css']
})
export class MissedComponent {
    tickets = Missed.RxData;
    count = Missed.RxData.map(q => q.length);
    search = true;
}