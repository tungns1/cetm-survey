import { Component, OnInit } from '@angular/core';
import { QueueService, Ticket } from '../../shared';

@Component({
  selector: 'app-mini-workspace',
  templateUrl: './mini.component.html',
  styleUrls: ['./mini.component.scss']
})
export class MiniWorkspaceComponent implements OnInit {

  constructor(
    private queueService: QueueService
  ) { }

  serving$ = this.queueService.serving$;
  nowServing: Ticket = null;
  nextTicket: Ticket = null;
  private subscription = this.serving$.subscribe(ticket => { this.nowServing = ticket[0] || null });

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
