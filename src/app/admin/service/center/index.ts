import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AdminNavService } from '../shared';
import { TFormService } from './tform';
import { ServiceService } from './service';
import { ServiceGroupService } from './service-group';
import { LayoutService } from './layout';
import { FeedbackUIService } from './feedbackUI';
import { TicketLayoutService } from './ticket_layout';
import { VoiceListService } from './voice';
import { AuthService, HttpServiceGenerator } from '../../shared';

@Injectable()
export class CenterService {
    constructor(
        private authService: AuthService,
        protected nav: AdminNavService,
        private httpSG: HttpServiceGenerator,
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
        this.LayoutService = new LayoutService(
            this.nav,
            this.httpSG.make(this.Link.Layout)
        );
        this.ServiceGroupService = new ServiceGroupService(
            this.nav,
            this.httpSG.make(this.Link.ServiceGroup),
            this.authService
        );
        this.FeedbackUIService = new FeedbackUIService(
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
    TicketLayoutService: TicketLayoutService;
    LayoutService: LayoutService;
    FeedbackUIService: FeedbackUIService;
    VoiceListService: VoiceListService;
    ServiceGroupService: ServiceGroupService;

    Link = {
        TForm: '/api/admin/center/tform',
        TicketLayout: '/api/admin/center/ticketlayout',
        Service: '/api/admin/center/service',
        ServiceGroup: '/api/admin/center/service_group',
        Layout: '/api/admin/center/layout',
        FeedbackUI: '/api/admin/center/feedbackUI',
        Voice: '/api/admin/center/voice'
    }
}
