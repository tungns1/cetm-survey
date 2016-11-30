import { Routes, RouterModule } from '@angular/router';
import { loginRoutes, authProviders, AuthGuard } from '../shared/auth/';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { CounterComponent } from './counter.component';

const branch = 'pgd-vinh-phuc';
const counter = 'quay_1';

const routes: Routes = [
  ...loginRoutes,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${branch}/${counter}`
  },
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