import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddClassDirective } from './add-class';
import { SideNavComponent } from './side-nav.component';
import { TopNavComponent } from './top-nav.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [SideNavComponent, TopNavComponent],
    declarations: [SideNavComponent, AddClassDirective, TopNavComponent]
})
export class NavModule {

}
