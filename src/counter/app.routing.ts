import { Routes, RouterModule } from '@angular/router';
import { loginRoutes, authProviders, AuthGuard } from '../shared/auth/';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { CounterComponent } from './counter.component';

const routes: Routes = [
  ...loginRoutes,
  {
    path: ':branch_code/:counter_code',
    component: CounterComponent,
    canActivate: [AuthGuard],
    data: {
      scope: 'staff',
      auto: true
    }
  }  
  // { path: '**', component: "PageNotFoundComponent" }
];


export const appRoutingProviders: any[] = [
  authProviders,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const routing = RouterModule.forRoot(routes);