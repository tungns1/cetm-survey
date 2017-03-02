import { Component } from '@angular/core';

import { I18n } from '../shared/';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(private translate: I18n.TranslateService) { }

    ngOnInit() {
        I18n.AddLanguages(this.translate);
    }

} 