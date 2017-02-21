import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ReportComponent {
    hidden = true;
    show=true;
    Hiden(){
        this.show=false;
    }
    Show(){
        this.show=true;
    }
}