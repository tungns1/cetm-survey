import { Component, OnInit } from '@angular/core';
import { QueueService } from '../shared/service/queue.service';
import { Ticket } from '../../../shared/model/house'

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor(
    private queueService: QueueService,
  ) { }

  ticketsWaiting$ = this.queueService.waiting$.map(tksWaiting => tksWaiting.map(tk => {
    let ticket = new Ticket(tk)
    return {
      ticketNum: ticket.cnum,
      cusPhoneNum: ticket.customer.phone_number,
      createTime: ticket.ctime,
      priority: ticket.priority
    }
  }).sort((a, b) => {
    return a.createTime > b.createTime ? 1 : -1;
  }));
  ticketsCanceled$ = this.queueService.cancel$.map(tksCancel => tksCancel.map(tk => {
    let ticket = new Ticket(tk)
    return {
      ticketNum: ticket.cnum,
      cusPhoneNum: ticket.customer.phone_number,
      calceledAt: ticket.mtime,
      priority: ticket.priority,
      afgL: ticket.mtime
    }
  }).sort((a, b) => {
    return a.calceledAt > b.calceledAt ? 1 : -1;
  }));

  ticketsWaitingCount$ = this.ticketsWaiting$.map(tksArr => tksArr.length);
  ticketsCanceledCount$ = this.ticketsCanceled$.map(tksArr => tksArr.length);

  ngOnInit() {
  }

  search(state: 'waiting' | 'canceled', value: string){
    console.log(state, value);
  }

}
