import { NgModule } from '@angular/core';
import { ReportTabComponent } from './tab.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [ReportTabComponent],
    exports: [ReportTabComponent],
})
export class ReportTabModule { }

export { RxTab } from './tab.component';
