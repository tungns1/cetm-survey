import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CultureModule, JSONFormModule} from '../form.module';
import {FormsModule} from '@angular/forms';
import {ServiceListComponent} from './service-list-form.component';
import { Model, Lib, SharedService } from '../../../../shared';


@NgModule({
    imports: [
        FormsModule, CommonModule,
        CultureModule, JSONFormModule,
        Lib.Ng.ModalModule,SharedService.I18n.TranslateModule
    ],
    declarations: [ServiceListComponent],
    exports: [ServiceListComponent]
})
export class ServiceListModule {

}
