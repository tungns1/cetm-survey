import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { UserComponent } from './user.component';
import { UserSettingComponent } from './user-setting';
import { ModalModule } from '../../../x/ng/';
import { Ng2BasicModule } from '../../../../lib/ng2';
import { AuthUserAPI } from './chang-pass.service';
import { ChangePassComponent } from './change-pass.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule, RouterModule, MatDialogModule,
        ModalModule, FormsModule, FlexLayoutModule, MatSnackBarModule,
        Ng2BasicModule, ReactiveFormsModule, MatMenuModule
    ],
    declarations: [HeaderComponent, LogoComponent, UserComponent, UserSettingComponent, ChangePassComponent],
    exports: [HeaderComponent],
    providers: [AuthUserAPI],
    entryComponents: [
        UserSettingComponent, ChangePassComponent
    ]
})
export class HeaderModule { }
