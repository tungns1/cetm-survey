import * as TForm from './tform';
import * as Layout from './layout';
import * as Service from './service';

import { Injectable } from '@angular/core';
import { AdminFilterService } from '../shared';
import { SharedService } from '../../shared';
import { TFormService } from './tform';
import { ServiceService } from './service';
import { LayoutService } from './layout';

@Injectable()
export class CenterService {
    constructor(
        protected filterService: AdminFilterService
    ) {
        this.onInit();
    }

    private onInit() {
        this.TFormService = new TFormService(this.Link.TForm, this.filterService);
        this.ServiceService = new ServiceService(this.Link.Service, this.filterService);
        this.LayoutService = new LayoutService(this.Link.Layout, this.filterService);
    }

    TFormService: TFormService;
    ServiceService: ServiceService;
    LayoutService: LayoutService;

    Link = {
        TForm: '/api/admin/center/tform',
        Service: '/api/admin/center/service',
        Layout: '/api/admin/center/layout'
    }
}
