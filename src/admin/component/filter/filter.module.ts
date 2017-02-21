import { NgModule } from '@angular/core';
import { SharedModule, Branch } from '../../shared';
import { AdminFilterComponent } from './filter.component';

@NgModule({
    imports: [SharedModule, Branch.BranchModule],
    declarations: [AdminFilterComponent],
    exports: [AdminFilterComponent]
})
export class AdminFilterModule { }