import { Component } from "@angular/core";


@Component({
    selector: "app-admin-root",
    template: `
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor() { }

    ngOnInit() {
        
    }

} 