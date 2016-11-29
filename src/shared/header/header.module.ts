import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { UserComponent } from './user.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HeaderComponent, LogoComponent, UserComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
