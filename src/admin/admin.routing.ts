import { Routes, RouterModule } from '@angular/router';
import { Auth } from './shared/';
import { AdminComponent, AdminHome } from './admin.component';
import { UserComponent } from './user/';
import { BranchComponent } from './branch/';

const children: Routes = [
  {
    path: '',
    component: AdminHome
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

export const routing = RouterModule.forRoot([
  {
    path: '',
    canActivate: [Auth.AuthGuard],
    component: AdminComponent,
    data: {
      scope: "admin"
    },
    children: children
  }
], { useHash: true });

export const components = children.map(c => c.component);

components.push(AdminComponent);

