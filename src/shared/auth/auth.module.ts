import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

export const authProviders = [
  AuthGuard
];

