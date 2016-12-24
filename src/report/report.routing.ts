import { Routes, RouterModule } from '@angular/router'
import { Auth } from './shared/';
import { ReportComponent } from './report.component';
import { ReportHistoryModule } from './history/';
import { ReportGeneralModule } from './general/'

const children: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tonghop' },
  { path: 'lichsu', loadChildren: () => ReportHistoryModule },
  { path: 'tonghop', loadChildren: () => ReportGeneralModule },
  { path: 'sosanh', loadChildren: 'admin/report/compare/compare.module' },
];

export const routing = RouterModule.forRoot([
  {
    path: '',
    canActivate: [Auth.AuthGuard],
    children: children,
    component: ReportComponent
  }
], { useHash: true });