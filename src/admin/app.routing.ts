import { Routes, RouterModule } from '@angular/router';
import { SharedService } from './shared/';
import {
  AdminComponent, OrgModule,
  CenterModule, HouseModule, MetaModule
} from './component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'org'
  },
  {
    path: 'org',
    loadChildren: () => OrgModule
  },
  {
    path: 'meta',
    loadChildren: () => MetaModule
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

