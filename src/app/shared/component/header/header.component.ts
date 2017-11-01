import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RuntimeEnvironment } from '../../env/';

@Component({
    selector: "app-header",
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    constructor(
        private env: RuntimeEnvironment
    ) { }

    moduleName$ = this.env.Auth.Data$.map(a => a.module);
    subModuleName$ = this.env.Auth.Data$.map(a => a.sub_module);

}