import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './shared';
import { CounterStateService } from './service';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(
        private translate: SharedService.I18n.I18nService,
        private route: ActivatedRoute,
        private stateService: CounterStateService,
        private authService: SharedService.Auth.AuthService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(p => {
            Object.assign(this.authService.options, p);
            this.stateService.SetBranchAndCounter(p['branch_code'], p['counter_code'])
        });
        this.authService.redirect = "/workspace";
        this.authService.autoLogin = true;
    }

} 