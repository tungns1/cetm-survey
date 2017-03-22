
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractState, AbstractStateService, BranchFilter, BranchFilterService } from '../../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { InsideBranchFilter, InsideBranchFilterService } from './inside-filter.service';
import { PeriodFilter, PeriodFilterService } from './period-filter.service';
import { AppStorage } from '../../../shared';

export class ReportFilter extends AbstractState {
    constructor(
        public Branch: BranchFilter,
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
            lang: AppStorage.Locale
        }, this.Inside.ToBackendQuery(),
            this.Period.ToBackendQuery()
        )
    }
    ToBackendQueryCustomer() {
        return Object.assign({},
            this.Period.ToBackendQuery()
        )
    }

    GetActiveID() {
        return this.Inside.GetActiveID() || this.Branch.GetBranchIDByLevel(0);
    }
}

@Injectable()
export class ReportFilterService extends AbstractStateService<ReportFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilterService: BranchFilterService,
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