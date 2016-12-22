import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorTabComponent } from './tab.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MonitorTabComponent],
    exports: [MonitorTabComponent],
})
export class MonitorTabModule { }
