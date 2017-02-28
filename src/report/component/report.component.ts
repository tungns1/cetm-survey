import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReportComponent {
    hidden = true;
}