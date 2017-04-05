import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { UserComponent } from './user/user.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'branch/0/list'
  },
  {
    path: 'user',
    pathMatch: 'full',
    redirectTo: 'user/list'
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'branch/:level/:id',
    component: BranchComponent
  }
]

import { OrgComponent } from './org.component';

export const routing = RouterModule.forChild([
  {
    path: '',
    component: OrgComponent,
    children: children
  }
]);