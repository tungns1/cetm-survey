import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService, I18nService } from "./shared";
import { CounterStateService } from "./service";

@Component({
    selector: "app-counter",
    template: `
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(
        private translate: I18nService,
        private route: ActivatedRoute,
        private stateService: CounterStateService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(p => {
            Object.assign(this.authService.options, p);
            this.stateService.SetBranchAndCounter(p["branch_code"], p["counter_code"])
        });
        console.log('counter');
        this.authService.redirect = "/workspace";
        this.authService.autoLogin = true;
    }

} 