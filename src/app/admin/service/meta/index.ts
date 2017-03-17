
import { Injectable } from '@angular/core';
import { AdminFilterService } from '../shared';
import { AuthService } from '../../shared';

import { BranchConfigService } from './branch_config';

@Injectable()
export class MetaService {
    constructor(
        protected filterService: AdminFilterService,
        private authService: AuthService
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
