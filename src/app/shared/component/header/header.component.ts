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
    ) {}
    
    moduleName$ = this.env.Auth$.map(a => a.Module);
    subModuleName$ = this.env.Auth$.map(a => a.Submodule);
}