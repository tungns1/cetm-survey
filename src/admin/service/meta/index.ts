
import { Injectable } from '@angular/core';
import { FilterService } from '../shared';
import { SharedService } from '../../shared';

import { BranchConfigService } from './branch_config';

@Injectable()
export class MetaService {
    constructor(
        protected filterService: FilterService,
        private authService: SharedService.Auth.AuthService
    ) {
        this.onInit();
    }

    private onInit() {
        this.BranchConfigService = new BranchConfigService(this.Link.Config, this.filterService);
    }

    BranchConfigService: BranchConfigService;

    Link = {
        Config: '/api/admin/config'
    }
}
