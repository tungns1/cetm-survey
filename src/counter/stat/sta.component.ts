import { Component, OnInit } from '@angular/core';
import { RxFinished, RxCancelled } from '../backend/stat';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({

    selector: 'sta',
    templateUrl: 'sta.component.html',
    styleUrls: ['sta.component.css']
})
export class StaComponent {
    finished = RxFinished;
    fc = RxFinished.map(v => v.length);

    cancelled = RxCancelled;
    cc = RxCancelled.map(v => v.length);

    tab = 'finished';

}