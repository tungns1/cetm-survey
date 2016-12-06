import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { ScreenComponent } from './screen/screen.component';

const children: Routes = [
  {
    path: 'house',
    pathMatch: 'full',
    redirectTo: 'screen'
  },
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'kiosk',
    component: KioskComponent
  },
  {
    path: 'screen',
    component: ScreenComponent
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

export const components = children.map(c => c.component).filter(c => !!c);
components.push(HouseComponent);

