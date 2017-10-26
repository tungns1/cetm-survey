import { Component, OnInit, ApplicationRef, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { QueueService, SuperCounterService, SuperCounterSocket } from './service';

@Component({
  selector: 'app-super-counter',
  templateUrl: './super-counter.component.html',
  styleUrls: ['./super-counter.component.scss']
})
export class SuperCounterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private superCounterService: SuperCounterService,
    private socket: SuperCounterSocket
  ) { }

  message$ = this.socket.StatusMessage$.map(m => {
    if (m.startsWith("OPEN")) return "";
    return "NETWORK " + m;
  });

  ngOnInit() {
    // this.composeService.enable();
    this.superCounterService.enable();
    this.superCounterService.Workspace$.subscribe(d => {
      console.log(d)
    })
  }

  ngOnDestroy() {
    // this.composeService.disable();
    this.superCounterService.disable();
  }

}
