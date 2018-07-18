import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueueService, SupperCounterTicketService } from '../shared/service';
import { Ticket } from '../../../shared/model/house';
import { ProjectConfig } from '../../shared';
import { map, switchMap } from 'rxjs/operators';

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

  maxWaitingMinute = ProjectConfig.service.max_waiting_minute;
  searchWaiting$ = new BehaviorSubject<string>('');
  searchCanceled$ = new BehaviorSubject<string>('');

  ticketsWaiting$ = this.queueService.waiting$.pipe(map(tksWaiting => tksWaiting.ToArray())
    ,switchMap(tickets => {
      return this.searchWaiting$.pipe(map(searchString => {
        return tickets.filter(tk => {
          return tk.cnum.indexOf(searchString) !== -1 || (tk.customer.phone_number && tk.customer.phone_number.indexOf(searchString) !== -1);
        })
      }))
    }))

  ticketsCanceled$ = this.queueService.cancel$.pipe(map(tksCancel => tksCancel.ToArray())
    ,switchMap(tickets => {
      return this.searchCanceled$.pipe(map(searchString => {
        return tickets.filter(tk => {
          return tk.cnum.indexOf(searchString) !== -1 || (tk.customer.phone_number && tk.customer.phone_number.indexOf(searchString) !== -1);
        })
      }))
    }))

  ticketsWaitingCount$ = this.ticketsWaiting$.pipe(map(tksArr => tksArr.length));
  ticketsCanceledCount$ = this.ticketsCanceled$.pipe(map(tksArr => tksArr.length));

  ngOnInit() {
  }

  search(state: 'waiting' | 'canceled', value: string) {
    if (state === 'waiting') {
      this.searchWaiting$.next(value);
    } else {
      this.searchCanceled$.next(value);
    }
  }

  restore(ticket: Ticket) {
    this.ticketService.TriggerAction('restore', ticket)
  }

}
