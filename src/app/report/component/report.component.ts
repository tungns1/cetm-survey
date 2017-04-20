import { Component, ViewEncapsulation, Input } from '@angular/core';
import { RuntimeEnvironment } from '../../shared/env';

@Component({
    selector: 'app-root',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReportComponent {
    constructor(
        private env: RuntimeEnvironment
    ) { }
    role = '';

    ngOnInit() {
        this.env.Auth.User$.subscribe(u => {
            this.role = u.role;
        })
    }
}