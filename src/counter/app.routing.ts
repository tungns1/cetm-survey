import { Routes, RouterModule } from '@angular/router';
import { loginRoutes, authProviders, AuthGuard } from '../shared/auth/';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

const routes: Routes = [
  ...loginRoutes,
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    data: {
      auto: true
    }
  }
];


export const appRoutingProviders: any[] = [
  authProviders,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const routing = RouterModule.forRoot(routes);