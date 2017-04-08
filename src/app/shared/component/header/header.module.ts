import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { UserComponent } from './user.component';
import { UserSettingComponent } from './user-setting';
import { ModalModule } from '../../../x/ng/';

@NgModule({
    imports: [
        CommonModule, RouterModule,
        ModalModule, FormsModule
    ],
    declarations: [HeaderComponent, LogoComponent, UserComponent, UserSettingComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
