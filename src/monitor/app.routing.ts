import { Routes, RouterModule } from '@angular/router'
import { Auth } from '../shared/';
import { MonitorComponent, MonitorTicketModule } from './component';

const children: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'ticket' },
    { path: 'ticket', loadChildren: () => MonitorTicketModule }
];

export const routing = RouterModule.forRoot([
    {
        path: '',
        canActivate: [Auth.AuthGuard],
        component: MonitorComponent,
        children: children
    }
], { useHash: true });