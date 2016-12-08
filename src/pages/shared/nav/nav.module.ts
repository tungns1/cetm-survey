import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddClassDirective } from './add-class';
import { TopNavComponent } from './top-nav.component';
import { SideBarComponent } from './side-bar.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [TopNavComponent, SideBarComponent],
    declarations: [AddClassDirective, TopNavComponent, SideBarComponent]
})
export class NavModule {

}
