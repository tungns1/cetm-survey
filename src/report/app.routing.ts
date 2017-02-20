import { Routes, RouterModule } from '@angular/router'
import { SharedService } from './shared/';
import { ReportComponent, ReportHistoryModule, ReportDashboardModule, ReportCustomerModule } from './component';

const children: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'history', loadChildren: () => ReportHistoryModule },
    { path: 'dashboard', loadChildren: () => ReportDashboardModule },
    { path: 'customer', loadChildren: () => ReportCustomerModule },
    { path: 'sosanh', loadChildren: 'admin/report/compare/compare.module' },
];

export const routing = RouterModule.forRoot([
    {
        path: '',
        canActivate: [SharedService.Auth.AuthGuard],
        children: children,
        component: ReportComponent
    }
], { useHash: true });