import { Routes, RouterModule } from '@angular/router';
import { AuthService, AuthGuard } from '../shared/auth/';

import { CounterComponent } from './counter.component';

const branch = 'pgd-vinh-phuc';
const counter = 'quay_1';

const routes: Routes = [
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
];

export const routing = RouterModule.forRoot(routes);