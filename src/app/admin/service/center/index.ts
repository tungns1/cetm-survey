import { Injectable } from '@angular/core';
import { AdminFilterService } from '../shared';
import { TFormService } from './tform';
import { ServiceService } from './service';
import { LayoutService } from './layout';
import { HttpServiceGenerator } from '../../shared';

@Injectable()
export class CenterService {
    constructor(
        protected filterService: AdminFilterService,
        private httpSG: HttpServiceGenerator
    ) {
        this.onInit();
    }

    private onInit() {
        this.TFormService = new TFormService(
            this.httpSG.make(this.Link.TForm),
            this.filterService
        );
        this.ServiceService = new ServiceService(
            this.httpSG.make(this.Link.Service),
            this.filterService
        );
        this.LayoutService = new LayoutService(
            this.httpSG.make(this.Link.Layout),
            this.filterService
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
