import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { UserComponent } from './user.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [HeaderComponent, LogoComponent, UserComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
