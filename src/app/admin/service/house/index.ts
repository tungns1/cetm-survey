import { Injectable } from '@angular/core';
import {
    BranchFilterService, AdminNavService,
    BranchCrudApiServiceGenerator,
    ICounter, IKiosk, IScreen, ISFlow
} from '../shared';
import { AuthService, HttpServiceGenerator } from '../../shared';

import { SFlowService } from './sflow';

@Injectable()
export class HouseService {
    constructor(
        private nav: AdminNavService,
        private filter: BranchFilterService,
        private hsg: HttpServiceGenerator,
        protected bcsg: BranchCrudApiServiceGenerator
    ) {

    }

    private Link = {
        Counter: '/api/admin/house/counter',
        Kiosk: '/api/admin/house/kiosk',
        Screen: '/api/admin/house/screen',
        SFlow: '/api/admin/house/sflow'
    }

    CounterService = this.bcsg.make<ICounter>(this.Link.Counter);
    KioskService = this.bcsg.make<IKiosk>(this.Link.Kiosk);
    ScreenService = this.bcsg.make<IScreen>(this.Link.Screen);
    SFlowService = new SFlowService(this.nav, this.hsg.make(this.Link.SFlow), this.filter);
}
