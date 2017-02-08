import { NgModule } from '@angular/core';
import { MonitorFilterComponent } from './filter.component';
import { SharedModule } from '../../shared/';

@NgModule({
    imports: [SharedModule],
    declarations: [
        MonitorFilterComponent
    ],
    exports: [MonitorFilterComponent],
})
export class MonitorFilterModule { }
