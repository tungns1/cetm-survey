import { NgModule } from '@angular/core';
import { SelectCheckModule } from '../shared';
import { SharedModule } from '../../shared';
import { AdminFilterComponent } from './filter.component';

@NgModule({
    imports: [SelectCheckModule, SharedModule],
    declarations: [AdminFilterComponent],
    exports: [AdminFilterComponent]
})
export class AdminFilterModule { }