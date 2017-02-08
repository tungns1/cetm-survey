import { Routes, RouterModule } from '@angular/router';
import { SharedService } from '../shared/';

import { CounterComponent } from './component/';

const routes: Routes = [
  {
    path: ':branch_code/:counter_code',
    component: CounterComponent,
    canActivate: [SharedService.Auth.AuthGuard]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });