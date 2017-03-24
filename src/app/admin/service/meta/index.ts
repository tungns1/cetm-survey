
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
        this.BranchConfigService = this.bcsg.make<IBranchConfig>(this.Link.Config);
    }

    BranchConfigService: BranchCrudApiService<IBranchConfig>;

    Link = {
        Config: '/api/admin/config'
    }
}
