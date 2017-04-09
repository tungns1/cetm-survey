import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/";
import { WorkspaceModule } from './workspace';
import { CounterComponent } from './counter/counter.component';

export function loadWorkspace() {
  return WorkspaceModule;
}

const children: Routes = [
  {
    path: "workspace",
    loadChildren: loadWorkspace,
    canActivate: [
      AuthGuard
    ]
  }
];

export const routing = RouterModule.forChild([{
  path: '',
  component: CounterComponent,
  children: children
}]);
