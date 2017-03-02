import { Routes, RouterModule } from '@angular/router';
import { SharedService } from '../shared/';

import { CounterComponent, WorkspaceModule, LegacyModule } from './component/';

const children: Routes = [
  {
    path: ':branch_code/:counter_code',
    loadChildren: () => LegacyModule
  },
  {
    path: 'workspace',
    loadChildren: () => WorkspaceModule,
    canActivate: [SharedService.Auth.AuthGuard]
  }
];

export const routing = RouterModule.forRoot([
  {
    path: '',
    component: CounterComponent,
    children: children
  }
], { useHash: true });
