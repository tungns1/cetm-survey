import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchFilterComponent } from './filter.component';
import { BranchFilterService } from './filter.service';
import { TranslateModule, SelectCheckModule } from '../../shared';
import { UtilPipeModule } from '../../pipe';
import { AccordionModule } from '../../../x/ui/accordion/accordion';

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, 
        TranslateModule, UtilPipeModule,
        SelectCheckModule, AccordionModule
    ],
    declarations: [BranchFilterComponent],
    exports: [BranchFilterComponent, AccordionModule]
})
export class BranchFilterModule { }