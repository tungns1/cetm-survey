import { NgModule } from '@angular/core';
import { I18n, Ng } from '../../shared';
import { InfoComponent } from './info.component';
@NgModule({
    imports: [Ng.ModalModule],
    declarations: [InfoComponent],
})
export class InfoCustomerModule { }