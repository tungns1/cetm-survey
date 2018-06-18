import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkspaceService, QueueService, Ticket } from '../../shared';

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
  counterName$ = this.workspaceService.currentCounter$.map(c => c.name);
  isServing$ = this.queueService._serving$.map(s => s.ToArray().length ? true : false)
  serving$ = this.queueService.serving$;
  nowServing: Ticket = null;

  ngOnInit() {
    this.serving$.subscribe(ticket => { this.nowServing = ticket[0] || null})
  }

}