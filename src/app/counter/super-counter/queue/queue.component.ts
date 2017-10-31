import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QueueService, SupperCounterTicketService } from '../shared/service';
import { Ticket } from '../../../shared/model/house'

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor(
    private queueService: QueueService,
    private ticketService: SupperCounterTicketService,
  ) { }

  searchWaiting$ = new BehaviorSubject<string>('');
  searchCanceled$ = new BehaviorSubject<string>('');

  ticketsWaiting$ = this.queueService.waiting$.map(tksWaiting => tksWaiting.ToArray())
    .switchMap(tickets => {
      return this.searchWaiting$.map(searchString => {
        return tickets.filter(tk => {
          return tk.cnum.indexOf(searchString) !== -1 || tk.customer.phone_number.toString().indexOf(searchString) !== -1;
        })
      })
    })

  ticketsCanceled$ = this.queueService.cancel$.map(tksCancel => tksCancel.ToArray())
    .switchMap(tickets => {
      return this.searchCanceled$.map(searchString => {
        return tickets.filter(tk => {
          return tk.cnum.indexOf(searchString) !== -1 || tk.customer.phone_number.toString().indexOf(searchString) !== -1;
        })
      })
    })

  ticketsWaitingCount$ = this.ticketsWaiting$.map(tksArr => tksArr.length);
  ticketsCanceledCount$ = this.ticketsCanceled$.map(tksArr => tksArr.length);

  ngOnInit() {
  }

  search(state: 'waiting' | 'canceled', value: string) {
    state === 'waiting' ? this.searchWaiting$.next(value) : this.searchCanceled$.next(value)
  }

  restore(ticket: Ticket) {
    this.ticketService.TriggerAction('restore', ticket)
  }

}
