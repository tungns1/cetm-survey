import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorTabComponent } from './tab.component';
import { I18n } from '../../shared';

@NgModule({
    imports: [CommonModule,I18n.TranslateModule],
    declarations: [MonitorTabComponent],
    exports: [MonitorTabComponent],
})
export class MonitorTabModule { }
