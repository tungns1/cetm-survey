import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
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
    @Input() height: number = 38;

    ngOnInit() {
        document.getElementById('header').style.height = this.height.toString() + 'px';
    }
}