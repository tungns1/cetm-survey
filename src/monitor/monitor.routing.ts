import { Routes, RouterModule } from '@angular/router'
import { Auth } from '../shared/';
import { MonitorComponent } from './monitor.component';
import { MonitorDeviceModule } from './device/';
import { MonitorTicketModule } from './ticket/';

const children: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'ticket' },
    { path: 'device', loadChildren: () => MonitorDeviceModule },
    { path: 'ticket', loadChildren: () => MonitorTicketModule }
];

export const routing = RouterModule.forRoot([
    {
        path: '',
        canActivate: [Auth.AuthGuard],
        children: children
    }
], { useHash: true });