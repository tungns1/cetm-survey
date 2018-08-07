import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import { RuntimeEnvironment } from '../../shared';

import { SuperCounterService, SuperCounterSocket } from './shared/service';

import { CountersMapComponent } from './counters-map/counters-map.component';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { map } from 'rxjs/operators';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true,
  threshold: 25,
};


@Component({
  selector: 'app-super-counter',
  templateUrl: './super-counter.component.html',
  styleUrls: ['./super-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuperCounterComponent implements OnInit {

  constructor(
    private superCounterService: SuperCounterService,
    private socket: SuperCounterSocket,
    private router: Router,
    private route: ActivatedRoute,
    private env: RuntimeEnvironment
  ) { }

  message$ = this.socket.StatusMessage$.pipe(map(m => {
    if (m.startsWith("OPEN")) return "";
    return "NETWORK " + m;
  }));

  index: number = 0;
  storeName$ = this.env.Auth.Data$.pipe(map(d => `- ${d.store} `));
  workspace$ = this.superCounterService.Workspace$;

  ngOnInit() {
    this.superCounterService.enable();
  }

  ngOnDestroy() {
    this.superCounterService.disable();
  }

  swiperConfig = DEFAULT_SWIPER_CONFIG;

}
