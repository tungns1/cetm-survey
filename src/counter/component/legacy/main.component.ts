import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CounterNavService, CounterStateService } from '../shared';

// redirect 
@Component({
    selector: 'main-view',
    template: ``
})
export class LegacyMainComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stateService: CounterStateService,
        private navService: CounterNavService
    ) {

    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        const branch_code = params['branch_code'];
        const counter_code = params['counter_code'];
        this.stateService.SetBranchAndCounter(branch_code, counter_code);
        this.router.navigate(["/workspace"], {
            queryParams: this.stateService.Current.GetBranchAndCounter()
        });
    }
}
