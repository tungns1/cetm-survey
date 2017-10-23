import { Injectable } from '@angular/core';
import {
    BranchFilterService, AdminNavService,
    BranchCrudApiServiceGenerator,
    ICounter, IKiosk, IScreen, ISFlow, IFeedback
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
        Feedback: '/api/admin/house/feedback',
        SFlow: '/api/admin/house/sflow'
    }

    CounterService = this.bcsg.make<ICounter>(this.Link.Counter);
    KioskService = this.bcsg.make<IKiosk>(this.Link.Kiosk);
    ScreenService = this.bcsg.make<IScreen>(this.Link.Screen);
    FeedbackService = this.bcsg.make<IFeedback>(this.Link.Feedback);
    SFlowService = new SFlowService(this.nav, this.hsg.make(this.Link.SFlow), this.filter);
}
