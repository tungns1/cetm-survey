import { Injectable } from '@angular/core';
import { AdminFilterService } from '../shared';
import { CounterService } from './counter';
import { KioskService } from './kiosk';
import { ScreenService } from './screen';
import { SFlowService } from './sflow';
import { HttpServiceGenerator } from '../../shared';

@Injectable()
export class HouseService {
    constructor(
        protected filterService: AdminFilterService,
        private httpSG: HttpServiceGenerator
    ) {
        this.onInit();
    }

    private onInit() {
        this.CounterService = new CounterService(
            this.httpSG.make(this.Link.Counter),
            this.filterService
        );
        this.KioskService = new KioskService(
            this.httpSG.make(this.Link.Kiosk),
            this.filterService
        );
        this.ScreenService = new ScreenService(
            this.httpSG.make(this.Link.Screen),
            this.filterService
        );
        this.SFlowService = new SFlowService(
            this.httpSG.make(this.Link.SFlow),
            this.filterService
        );
    }

    CounterService: CounterService;
    KioskService: KioskService;
    ScreenService: ScreenService;
    SFlowService: SFlowService;

    Link = {
        Counter: '/api/admin/house/counter',
        Kiosk: '/api/admin/house/kiosk',
        Screen: '/api/admin/house/screen',
        SFlow: '/api/admin/house/sflow'
    }
}
