import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { InfoComponent } from './info.component';


@NgModule({
    imports: [SharedModule],
    declarations: [InfoComponent],
    exports: [InfoComponent]
})
export class InfoCustomerModule { }