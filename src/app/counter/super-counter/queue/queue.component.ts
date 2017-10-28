import { Component, OnInit } from '@angular/core';
import { QueueService } from '../service/queue.service';
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
  }));
  ticketsCanceled$ = this.queueService.cancel$.map(tksCancel => tksCancel.map(tk => {
    let ticket = new Ticket(tk)
    return {
      ticketNum: ticket.cnum,
      cusPhoneNum: ticket.customer.phone_number,
      waitingTime: ticket.mtime,
      priority: ticket.priority
    }
  }));

  ticketsWaitingCount$ = this.ticketsWaiting$.map(tksArr => tksArr.length);
  ticketsCanceledCount$ = this.ticketsCanceled$.map(tksArr => tksArr.length);

  ngOnInit() {
  }

}
