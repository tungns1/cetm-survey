import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';

// import {  } from 'ngx-swiper-wrapper'
import { SuperCounterService, SuperCounterSocket } from './shared/service';

import { CountersMapComponent } from './counters-map/counters-map.component';

@Component({
  selector: 'app-super-counter',
  templateUrl: './super-counter.component.html',
  styleUrls: ['./super-counter.component.scss']
})
export class SuperCounterComponent implements OnInit {

  constructor(
    private superCounterService: SuperCounterService,
    private socket: SuperCounterSocket,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  message$ = this.socket.StatusMessage$.map(m => {
    if (m.startsWith("OPEN")) return "";
    return "NETWORK " + m;
  });

  index: number = 0;

  ngOnInit() {
    this.superCounterService.enable();
  }

  toggle(){
    console.log(this.index)
    this.index == 1 ? this.index = 0 : this.index = 1;
  }

  backToSetting(){
    this.router.navigate(['/counter/super/setting'], {
      queryParamsHandling: 'preserve',
      relativeTo: this.route
    });
  }

  ngOnDestroy() {
    this.superCounterService.disable();
  }

}
