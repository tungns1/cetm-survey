
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { InsideBranchFilterService } from './inside-filter.service';
import { PeriodFilterService } from './period-filter.service';
import { AppStorage, BranchFilterService } from '../../../shared';

@Injectable()
export class ReportFilterService {
    constructor(
        private branchFilterService: BranchFilterService,
        private insideFilterService: InsideBranchFilterService,
        private periodFilterService: PeriodFilterService
    ) {

    }

    ToBackendQuery() {
        const branch_id = this.branchFilterService.getLowestBranches();
        return Object.assign({}, {
            branch_id: branch_id.join(','),
            lang: AppStorage.Locale
        }, this.insideFilterService.ToQuery(),
            this.periodFilterService.ToQuery()
        )
    }

    ToBackendQueryCustomer() {
        return Object.assign({},
            this.periodFilterService.ToQuery()
        )
    }

    GetActiveID() {
        return this.insideFilterService.GetActiveID() || this.branchFilterService.getByLevel(0);
    }

}