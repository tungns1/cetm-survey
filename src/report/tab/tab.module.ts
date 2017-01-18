import { NgModule } from '@angular/core';
import { ReportTabComponent } from './tab.component';
import { CommonModule } from '@angular/common';
import { I18n } from '../shared';

@NgModule({
    imports: [CommonModule,I18n.TranslateModule],
    declarations: [ReportTabComponent],
    exports: [ReportTabComponent],
})
export class ReportTabModule { }

export { RxTab } from './tab.component';
