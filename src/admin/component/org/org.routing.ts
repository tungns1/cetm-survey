import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { UserComponent } from './user/user.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'branch/0'
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'branch/:level',
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

export const components = children.map(c => c.component).filter(c => !!c);
components.push(OrgComponent);

