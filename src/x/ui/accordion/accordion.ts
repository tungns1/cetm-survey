import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {AccordionTitleComponent} from './accordion.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AccordionComponent, AccordionTitleComponent],
    exports: [AccordionComponent, AccordionTitleComponent]
})
export class AccordionModule { }