import { Routes, RouterModule } from '@angular/router';
import { BranchConfigModule } from './branch_config/branch_config.module';
import { MetaComponent } from './meta.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'branch_config'
  },
  {
    path: 'branch_config',
    loadChildren: () => BranchConfigModule
  }
]

export const routing = RouterModule.forChild([
  {
    path: '',
    component: MetaComponent,
    children: children
  }
]);

export const components = children.map(c => c.component).filter(c => !!c);

components.push(MetaComponent);

