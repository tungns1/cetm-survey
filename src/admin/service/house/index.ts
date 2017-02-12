import { Injectable } from '@angular/core';
import { FilterService } from '../shared';
import { SharedService } from '../../shared';
import { CounterService } from './counter';
import { KioskService } from './kiosk';
import { ScreenService } from './screen';
import { SFlowService } from './sflow';

@Injectable()
export class HouseService {
    constructor(
        protected filterService: FilterService
    ) {
        this.onInit();
    }

    private onInit() {
        this.CounterService = new CounterService(this.Link.Counter, this.filterService);
        this.KioskService = new KioskService(this.Link.Kiosk, this.filterService);
        this.ScreenService = new ScreenService(this.Link.Screen, this.filterService);
        this.SFlowService = new SFlowService(this.Link.SFlow, this.filterService);
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
