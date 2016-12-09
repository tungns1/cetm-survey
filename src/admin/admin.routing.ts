import { Routes, RouterModule } from '@angular/router';
import { Auth } from './shared/';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/';
import { BranchComponent } from './branch/';
import { CenterModule } from './center/';
import {HouseModule} from './house/';

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
  },
  {
    path: 'house',
    loadChildren: () => HouseModule
  },
  {
    path: 'center',
    loadChildren: () => CenterModule
  }
]

export const routing = RouterModule.forRoot([
  {
    path: '',
    canActivate: [Auth.AuthGuard],
    component: AdminComponent,
    children: children
  }
], { useHash: true });

export const components = children.map(c => c.component).filter(c => !!c);

components.push(AdminComponent);

