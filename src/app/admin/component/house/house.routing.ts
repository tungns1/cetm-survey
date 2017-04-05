import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { ScreenComponent } from './screen/screen.component';
import { SFlowComponent } from './sflow/sflow.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'screen'
  },
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'kiosk',
    pathMatch: 'full',
    redirectTo: 'kiosk/list'
  },
  {
    path: 'kiosk/:id',
    component: KioskComponent
  },
  {
    path: 'screen',
    pathMatch: 'full',
    redirectTo: 'screen/list'
  },
  {
    path: 'screen/:id',
    component: ScreenComponent
  },
  {
    path: 'sflow',
    component: SFlowComponent
  }
]

import { HouseComponent } from './house.component';

export const routing = RouterModule.forChild([
  {
    path: '',
    component: HouseComponent,
    children: children
  }
]);
