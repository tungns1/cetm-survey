import { Routes, RouterModule } from '@angular/router';
import { BranchConfigModule } from './branch_config/branch_config.module';
import { MetaComponent } from './meta.component';

export function loadBranchConfigModule() {
  return BranchConfigModule;
}

export const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'branch_config'
  },
  {
    path: 'branch_config',
    loadChildren: loadBranchConfigModule
  }
]

export const routing = RouterModule.forChild([
  {
    path: '',
    component: MetaComponent,
    children: children
  }
]);