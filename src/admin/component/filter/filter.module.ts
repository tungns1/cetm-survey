import { NgModule } from '@angular/core';
import { SelectCheckModule } from '../shared';
import { SharedModule } from '../../shared';
import { AdminFilterComponent } from './filter.component';
import { AdminFilterService } from './filter.service';

@NgModule({
    imports: [SelectCheckModule, SharedModule],
    declarations: [AdminFilterComponent],
    providers: [AdminFilterService],
    exports: [AdminFilterComponent]
})
export class AdminFilterModule { }