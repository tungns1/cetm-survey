import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { routing } from './auth.routes';
import { AuthProvider } from './auth-provider';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [AuthComponent, LoginComponent, LogoutComponent],
  providers: [AuthProvider]
})
export class AuthModule {

}
