import { NgModule } from '@angular/core';
import { SharedModule, BranchModule } from '../../shared';
import { AdminFilterComponent } from './filter.component';

@NgModule({
    imports: [SharedModule, BranchModule],
    declarations: [AdminFilterComponent],
    exports: [AdminFilterComponent]
})
export class AdminFilterModule { }