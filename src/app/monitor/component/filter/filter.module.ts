import { NgModule } from '@angular/core';
import { MonitorFilterComponent } from './filter.component';
import { SharedModule, BranchModule } from '../../shared/';

@NgModule({
    imports: [SharedModule, BranchModule],
    declarations: [
        MonitorFilterComponent
    ],
    exports: [MonitorFilterComponent],
})
export class MonitorFilterModule { }
