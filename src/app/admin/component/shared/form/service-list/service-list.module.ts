import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultureModule, JSONFormModule } from '../form.module';
import { FormsModule } from '@angular/forms';
import { ServiceListComponent } from './service-list-form.component';
import { ModalModule, SharedModule } from '../../../../shared';
import { AccordionModule } from '../../../../../x/ui/accordion/accordion';
import { ServiceCustomizeModal } from './service-customer.component';

@NgModule({
    imports: [
        FormsModule, CommonModule,
        CultureModule, JSONFormModule,
        ModalModule, SharedModule, AccordionModule
    ],
    declarations: [ServiceListComponent, ServiceCustomizeModal],
    exports: [ServiceListComponent],
    entryComponents: [ServiceCustomizeModal]
})
export class ServiceListModule {

}
