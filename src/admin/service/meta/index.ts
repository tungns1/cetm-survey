
import { Injectable } from '@angular/core';
import { FilterService } from '../shared';
import { SharedService } from '../../shared';

import { ConfigService } from './config';

@Injectable()
export class MetaService {
    constructor(
        protected filterService: FilterService,
        private authService: SharedService.Auth.AuthService
    ) {
        this.onInit();
    }

    private onInit() {
        this.ConfigService = new ConfigService(this.Link.Config, this.filterService);
    }

    ConfigService: ConfigService;

    Link = {
        Config: '/api/admin/config'
    }
}
