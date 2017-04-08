import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CultureModule, JSONFormModule} from '../form.module';
import {FormsModule} from '@angular/forms';
import {ServiceListComponent} from './service-list-form.component';
import { ModalModule } from '../../../../shared';


@NgModule({
    imports: [
        FormsModule, CommonModule,
        CultureModule, JSONFormModule,
        ModalModule
    ],
    declarations: [ServiceListComponent],
    exports: [ServiceListComponent]
})
export class ServiceListModule {

}
