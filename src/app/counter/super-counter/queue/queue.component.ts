import { Component, OnInit } from '@angular/core';
import { QueueService } from '../service/queue.service'

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  constructor(
    private queueService: QueueService
  ) { }

  ticketsWaiting$ = this.queueService.waiting$.map(tksWaiting => tksWaiting.map(tk => {
    return { 
      ticketNum: tk.cnum,
      cusPhoneNum: tk.customer.phone_number,
      createTime: tk.ctime
    }
  }));
  ticketsCanceled$ = this.queueService.cancel$.map(tksCancel => tksCancel.map(tk => {
    return { 
      ticketNum: tk.cnum,
      cusPhoneNum: tk.customer.phone_number,
      waitingTime: tk.mtime
    }
  }));

  ticketsWaitingCount$ = this.ticketsWaiting$.map(tksArr => tksArr.length);
  ticketsCanceledCount$ = this.ticketsCanceled$.map(tksArr => tksArr.length);

  ngOnInit() {
  }

}
