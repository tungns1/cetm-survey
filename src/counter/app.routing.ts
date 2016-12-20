import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth/';

import { CounterComponent } from './counter.component';

const routes: Routes = [
  {
    path: ':branch_code/:counter_code',
    component: CounterComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });