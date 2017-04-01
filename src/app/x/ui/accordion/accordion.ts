import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionTitleComponent } from './accordion.component';
import { AccordionGroupComponent } from './accordion-group.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AccordionComponent, AccordionTitleComponent,
        AccordionGroupComponent
    ],
    exports: [
        AccordionComponent, AccordionTitleComponent,
        AccordionGroupComponent
    ]
})
export class AccordionModule { }