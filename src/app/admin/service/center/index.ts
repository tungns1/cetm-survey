import { Injectable } from '@angular/core';
import { AdminNavService } from '../shared';
import { TFormService } from './tform';
import { ServiceService } from './service';
import { LayoutService } from './layout';
import { HttpServiceGenerator } from '../../shared';

@Injectable()
export class CenterService {
    constructor(
        protected nav: AdminNavService,
        private httpSG: HttpServiceGenerator
    ) {
        this.onInit();
    }

    private onInit() {
        this.TFormService = new TFormService(
            this.nav,
            this.httpSG.make(this.Link.TForm)
        );
        this.ServiceService = new ServiceService(
            this.nav,
            this.httpSG.make(this.Link.Service)
        );
        this.LayoutService = new LayoutService(
            this.nav,
            this.httpSG.make(this.Link.Layout)
        );
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
