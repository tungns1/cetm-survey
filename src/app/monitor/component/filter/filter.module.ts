import { NgModule } from '@angular/core';
import { MonitorFilterComponent } from './filter.component';
import { SharedModule, Branch } from '../../shared/';

@NgModule({
    imports: [SharedModule, Branch.BranchModule],
    declarations: [
        MonitorFilterComponent
    ],
    exports: [MonitorFilterComponent],
})
export class MonitorFilterModule { }
