import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../shared/model/house'
import { SuperCounterService } from '../service/super-counter.service';

@Component({
  selector: 'app-counter-detail',
  templateUrl: './counter-detail.component.html',
  styleUrls: ['./counter-detail.component.scss']
})
export class CounterDetailComponent implements OnInit {

  constructor(
    private superCounterService: SuperCounterService,
  ) { }

  ticket: Ticket;
  counterDetail$ = this.superCounterService.SelectedCounter$

  ngOnInit() {
    this.counterDetail$.subscribe(d => {
      if (d) {
        this.ticket = d.serving ? new Ticket(d.serving) : null;
      }
    })
  }

}
