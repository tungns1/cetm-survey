import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkspaceService, QueueService, Ticket } from '../../shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-normal-workspace',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NormalWorkspaceComponent implements OnInit {

  constructor(
    private workspaceService: WorkspaceService,
    private queueService: QueueService
  ) { }

  hasMiss = false;
  counterName$ = this.workspaceService.currentCounter$.pipe(map(c => c.name));
  isServing$ = this.queueService._serving$.pipe(map(s => s.ToArray().length ? true : false));
  serving$ = this.queueService.serving$;
  nowServing: Ticket = null;
  nextTicket: Ticket = null;
  private subscription = this.serving$.subscribe(ticket => { this.nowServing = ticket[0] || null})
  private subscription1 = this.queueService.waiting$.subscribe(v => this.nextTicket = v[0] || null)
  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

}