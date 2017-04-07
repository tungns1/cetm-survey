import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { TFormComponent } from './tform/tform.component';
import { LayoutComponent } from './layout/layout.component';
import { CenterComponent } from './center.component';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'service'
  },
  {
    path: 'service',
    pathMatch: 'full',
    redirectTo: 'service/list'
  },
  {
    path: 'service/:id',
    component: ServiceComponent
  },
  {
    path: 'tform',
    pathMatch: 'full',
    redirectTo: 'tform/list'
  },
  {
    path: 'tform/:id',
    component: TFormComponent
  },
  {
    path: 'layout',
    pathMatch: 'full',
    redirectTo: 'layout/list'
  },
  {
    path: 'layout',
    component: LayoutComponent
  },
  {
    path: 'ticketlayout',
    pathMatch: 'full',
    redirectTo: 'ticketlayout/list'
  },
  {
    path: 'ticketlayout/:id',
    component: TicketLayoutComponent
  }
]

export const routing = RouterModule.forChild([
  {
    path: '',
    component: CenterComponent,
    children: children
  }
]);
