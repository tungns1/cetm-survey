import { Routes, RouterModule } from '@angular/router';
import { SharedService } from './shared/';
import {
  AdminComponent, BranchComponent, UserComponent,
  CenterModule, HouseModule, ConfigModule
} from './component';


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
    path: 'config',
    loadChildren: () => ConfigModule
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
    canActivate: [SharedService.Auth.AuthGuard],
    component: AdminComponent,
    children: children
  }
], { useHash: true });

export const components = children.map(c => c.component).filter(c => !!c);

components.push(AdminComponent);

