
import { Injectable } from '@angular/core';
import {
    SmallStorage, RouterQueryStorageStrategy,
    BranchFilterService
} from '../../shared';

interface IMonitorFilder {
    focus: string;
}

@Injectable()
export class MonitorFilterService extends SmallStorage<IMonitorFilder> {
    constructor(
        storageStrategy: RouterQueryStorageStrategy,
        private branchFilterService: BranchFilterService
    ) {
        super("monitor", storageStrategy);
    }

    GetStores() {
        return this.branchFilterService.getByLevel(0);
    }

    ToQuery() {
        const branches = this.GetStores();
        return Object.assign(
            { branch_id: branches.join(',') },
            { focus: this.data.focus }
        );
    }
}