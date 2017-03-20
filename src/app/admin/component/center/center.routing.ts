import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { TFormComponent } from './tform/tform.component';
import { LayoutComponent } from './layout/layout.component';
import { CenterComponent } from './center.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'service'
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'tform',
    component: TFormComponent
  },
  {
    path: 'layout',
    component: LayoutComponent
  }
]

export const routing = RouterModule.forChild([
  {
    path: '',
    component: CenterComponent,
    children: children
  }
]);
