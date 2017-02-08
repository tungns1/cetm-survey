import { Component } from '@angular/core';
import { SharedService } from './shared';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(private translate: SharedService.I18n.TranslateService) { }

    ngOnInit() {
        SharedService.I18n.AddLanguages(this.translate);
    }

} 