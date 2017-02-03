import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddClassDirective } from './add-class';
import { TopNavComponent } from './top-nav.component';
import { SideBarComponent } from './side-bar.component';
import { I18n } from '../../../shared';
@NgModule({
    imports: [CommonModule, RouterModule,I18n.TranslateModule],
    exports: [TopNavComponent, SideBarComponent],
    declarations: [AddClassDirective, TopNavComponent, SideBarComponent]
})
export class NavModule {

}
