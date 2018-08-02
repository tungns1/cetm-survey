import { Routes, RouterModule } from '@angular/router';
import { BranchConfigModule } from './branch_config/branch_config.module';
import { MetaComponent } from './meta.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { SystemConfigModule } from './system-config/system-config.module';

export function loadBranchConfigModule() {
  return BranchConfigModule;
}

export function loadSystemConfigModule() {
  return SystemConfigModule;
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
  },
  {
      path: 'sconfig',
      loadChildren: loadSystemConfigModule
  }
]

export const routing = RouterModule.forChild([
  {
    path: '',
    component: MetaComponent,
    children: children
  }
]);