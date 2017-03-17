import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { routing } from './auth.routes';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [AuthComponent, LoginComponent, LogoutComponent]
})
export class AuthModule { }
