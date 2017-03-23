import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReportFilterService } from './filter';
import { ReportViewService } from './view.service';

@Injectable()
export class NavService {
    constructor(
        private router: Router,
        private filterService: ReportFilterService,
        private viewService: ReportViewService
    ) { }

    SyncFilter() {
        this.SyncLink();
    }

    SyncView() {
        this.viewService.triggerChange();
        this.SyncLink();
    }

    SyncLink() {
        this.router.navigate([], {
            queryParams: this.GetQuery()
        })
    }

    private GetQuery() {
        return Object.assign({},
            this.filterService.ToBackendQuery(),
            this.viewService.Current.ToQuery()
        );
    }


}