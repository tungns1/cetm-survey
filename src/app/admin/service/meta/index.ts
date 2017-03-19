
import { Injectable } from '@angular/core';
import { AdminFilterService } from '../shared';
import { AuthService } from '../../shared';

import { BranchConfigService } from './branch_config';
import { HttpServiceGenerator } from '../../shared';

@Injectable()
export class MetaService {
    constructor(
        protected filterService: AdminFilterService,
        private authService: AuthService,
        private httpSG: HttpServiceGenerator
    ) {
        this.onInit();
    }

    private onInit() {
        this.BranchConfigService = new BranchConfigService(
            this.httpSG.make(this.Link.Config),
            this.filterService
        );
    }

    BranchConfigService: BranchConfigService;

    Link = {
        Config: '/api/admin/config'
    }
}
