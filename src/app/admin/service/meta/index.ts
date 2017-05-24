
import { Injectable } from '@angular/core';
import {
    BranchCrudApiService,
    BranchCrudApiServiceGenerator, IBranchConfig
} from '../shared';

@Injectable()
export class MetaService {
    constructor(
        protected bcsg: BranchCrudApiServiceGenerator
    ) {
        this.onInit();
    }

    private onInit() {
        this.BranchConfigService = this.bcsg.make<IBranchConfig>(this.Link.BranchConfig);
    }

    BranchConfigService: BranchCrudApiService<IBranchConfig>;

    Link = {
        BranchConfig: '/api/admin/setting/branch_config'
    }
}
