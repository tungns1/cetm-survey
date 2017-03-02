import { NgModule } from '@angular/core';
import { LegacyMainComponent } from './main.component';
import { RouterModule } from '@angular/router';

const routing = RouterModule.forChild([{
    path: '',
    component: LegacyMainComponent
}])

@NgModule({
    imports: [routing],
    declarations: [LegacyMainComponent]
})
export class LegacyModule {

}