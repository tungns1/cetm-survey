import { NgModule } from '@angular/core';
import { SharedModule, Branch } from '../../shared';
import { AdminFilterComponent } from './filter.component';

@NgModule({
    imports: [SharedModule, Branch.BranchFilterModule],
    declarations: [AdminFilterComponent],
    exports: [AdminFilterComponent]
})
export class AdminFilterModule { }