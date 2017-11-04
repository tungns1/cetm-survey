import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import { RuntimeEnvironment } from '../../shared';

import { SuperCounterService, SuperCounterSocket } from './shared/service';

import { CountersMapComponent } from './counters-map/counters-map.component';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  threshold: 25,
  nextButton: true,
  prevButton: true
};


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
    private route: ActivatedRoute,
    private env: RuntimeEnvironment
  ) { }

  message$ = this.socket.StatusMessage$.map(m => {
    if (m.startsWith("OPEN")) return "";
    return "NETWORK " + m;
  });

  index: number = 0;
  storeName: string;

  ngOnInit() {
    this.superCounterService.enable();
    this.env.Auth.Data$.subscribe(d => {
      this.storeName = d.store;
    })
  }

  toggle() {
    this.index == 1 ? this.index = 0 : this.index = 1;
  }

  backToSetting() {
    this.router.navigate(['/counter/super/setting'], {
      queryParamsHandling: 'preserve',
      relativeTo: this.route
    });
  }

  ngOnDestroy() {
    this.superCounterService.disable();
  }

  swiperConfig = DEFAULT_SWIPER_CONFIG;

}
