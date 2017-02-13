import { NgModule } from '@angular/core';
import { ReportTabComponent } from './tab.component';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule],
    declarations: [ReportTabComponent],
    exports: [ReportTabComponent],
})
export class ReportTabModule { }

export { RxTab } from './tab.component';
