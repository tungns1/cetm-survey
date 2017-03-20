import { Component } from "@angular/core";
import { I18nService } from "./shared";

@Component({
    selector: "app-root",
    template: `
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(private translate: I18nService) { }

    ngOnInit() {
        
    }

} 