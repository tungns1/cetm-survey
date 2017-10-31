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

  ticketsWaiting$ = this.queueService.waiting$.map(tksWaiting => tksWaiting.ToArray().map(tk => {
    return {
      ticketNum: tk.cnum,
      cusPhoneNum: tk.customer.phone_number,
      createTime: tk.ctime,
      priority: tk.priority
    }
  }));
  
  ticketsCanceled$ = this.queueService.cancel$.map(tksCancel => tksCancel.ToArray().map(tk => {
    return {
      ticketNum: tk.cnum,
      cusPhoneNum: tk.customer.phone_number,
      calceledAt: tk.mtime,
      priority: tk.priority,
      afgL: tk.mtime
    }
  }));

  ticketsWaitingCount$ = this.ticketsWaiting$.map(tksArr => tksArr.length);
  ticketsCanceledCount$ = this.ticketsCanceled$.map(tksArr => tksArr.length);

  

  ngOnInit() {
  }

  search(state: 'waiting' | 'canceled', value: string){
    console.log(state, value);
  }

}
