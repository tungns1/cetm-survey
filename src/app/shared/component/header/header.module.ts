import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { UserComponent } from './user.component';
import { UserSettingComponent } from './user-setting';
import { TranslateModule } from '../../shared';
import { ModalModule } from '../../../x/ng/';

@NgModule({
    imports: [CommonModule, TranslateModule, RouterModule, ModalModule],
    declarations: [HeaderComponent, LogoComponent, UserComponent, UserSettingComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
