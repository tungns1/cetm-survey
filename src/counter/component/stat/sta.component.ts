import { Component, OnInit } from '@angular/core';
import { RxFinished, RxCancelled, SumStat } from '../../service/stat';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    selector: 'sta',
    templateUrl: 'sta.component.html',
    styleUrls: ['sta.component.css']
})
export class StaComponent {
    finished = RxFinished;
    fc = RxFinished.map(SumStat);

    cancelled = RxCancelled;
    cc = RxCancelled.map(SumStat);

    tab = 'finished';

}