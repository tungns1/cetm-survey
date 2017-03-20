import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/";

import { CounterComponent, WorkspaceModule, LegacyModule } from "./component/";
import { WorkspaceGuard } from './service';

export function loadLegacyModule() {
  return LegacyModule;
}

export function loadWorkspace() {
  return WorkspaceModule;
}

const children: Routes = [
  {
    path: ":branch_code/:counter_code",
    loadChildren: loadLegacyModule
  },
  {
    path: "workspace",
    loadChildren: loadWorkspace,
    canActivate: [
      WorkspaceGuard,
      AuthGuard
    ]
  }
];

export const routing = RouterModule.forChild([
  {
    path: "",
    component: CounterComponent,
    children: children
  }
]);
