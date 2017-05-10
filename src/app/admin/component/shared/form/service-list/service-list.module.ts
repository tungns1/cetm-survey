import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultureModule, JSONFormModule } from '../form.module';
import { FormsModule } from '@angular/forms';
import { ServiceListComponent, ServiceListModal } from './service-list-form.component';
import { ModalModule, SharedModule } from '../../../../shared';


@NgModule({
    imports: [
        FormsModule, CommonModule,
        CultureModule, JSONFormModule,
        ModalModule, SharedModule
    ],
    declarations: [ServiceListComponent, ServiceListModal],
    exports: [ServiceListComponent, ServiceListModal],
    entryComponents: [ServiceListModal]
})
export class ServiceListModule {

}
