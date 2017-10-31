import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ticket } from '../../../shared/model/house'
import { SuperCounterService } from '../shared/service';

@Component({
  selector: 'app-counter-detail',
  templateUrl: './counter-detail.component.html',
  styleUrls: ['./counter-detail.component.scss']
})
export class CounterDetailComponent implements OnInit {

  constructor(
    private superCounterService: SuperCounterService,
  ) { }

  // ticket$: BehaviorSubject<Ticket> ;
  ticket$ = new BehaviorSubject<Ticket>(null)
  counterDetail$ = this.superCounterService.SelectedCounter$

  ngOnInit() {
    this.counterDetail$.subscribe(d => {
      if (d) {
        this.ticket$.next(d.serving ? new Ticket(d.serving) : null);
      }
    })
  }

}
