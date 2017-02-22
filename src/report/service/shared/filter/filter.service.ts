
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Model, Branch } from '../../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { InsideBranchFilter, InsideBranchFilterService } from './inside-filter.service';
import { PeriodFilter, PeriodFilterService } from './period-filter.service';

export class ReportFilter extends Model.SharedModel.AbstractState {
    constructor(
        public Branch: Branch.BranchFilter,
        public Inside: InsideBranchFilter,
        public Period: PeriodFilter
    ) {
        super();
    }

    ToQuery() {
        return Object.assign({},
            this.Branch.ToQuery(),
            this.Inside.ToQuery(),
            this.Period.ToQuery()
        );
    }

    ToBackendQuery() {
        const branch_id = this.Branch.GetBranchIDAtLowestLevel();
        return Object.assign({}, {
            branch_id: branch_id.join(','),
        }, this.Inside.ToBackendQuery(),
            this.Period.ToBackendQuery()
        )
    }
    ToBackendQueryCustomer() {
        return Object.assign({},
            this.Period.ToBackendQuery()
        )
    }
}

@Injectable()
export class ReportFilterService extends Model.SharedModel.AbstractStateService<ReportFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilterService: Branch.BranchFilterService,
        private insideFilterService: InsideBranchFilterService,
        private periodFilterService: PeriodFilterService
    ) {
        super(route);
        this.onInit(new ReportFilter(
            this.branchFilterService.Current,
            this.insideFilterService.Current,
            this.periodFilterService.Current
        ));
    }
}