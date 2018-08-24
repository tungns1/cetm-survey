import { Injectable } from '@angular/core';
import { AdminNavService } from '../shared';
import { TFormService } from './tform';
import { ServiceService } from './service';
import { ServiceGroupService } from './service-group';
import { LayoutService } from './layout';
import { TicketLayoutService } from './ticket_layout';
import { VoiceListService } from './voice';
import { AuthService, HttpServiceGenerator } from '../../shared';

@Injectable()
export class CenterService {
    constructor(
        private authService: AuthService,
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
        this.TicketLayoutService = new TicketLayoutService(
            this.nav,
            this.httpSG.make(this.Link.TicketLayout)
        );
        this.ServiceService = new ServiceService(
            this.nav,
            this.httpSG.make(this.Link.Service),
            this.authService
        );
        this.ServiceGroupService = new ServiceGroupService(
            this.nav,
            this.httpSG.make(this.Link.ServiceGroup),
            this.authService
        );
        this.LayoutService = new LayoutService(
            this.nav,
            this.httpSG.make(this.Link.Layout)
        );
        this.VoiceListService = new VoiceListService(
            this.nav,
            this.httpSG.make(this.Link.Voice)
        );
    }

    TFormService: TFormService;
    ServiceService: ServiceService;
    ServiceGroupService: ServiceGroupService;
    TicketLayoutService: TicketLayoutService;
    LayoutService: LayoutService;
    VoiceListService: VoiceListService;

    Link = {
        TForm: '/api/admin/center/tform',
        TicketLayout: '/api/admin/center/ticketlayout',
        Service: '/api/admin/center/service',
        ServiceGroup: '/api/admin/center/service_group',
        Layout: '/api/admin/center/layout',
        Voice: '/api/admin/center/voice'
    }
}
