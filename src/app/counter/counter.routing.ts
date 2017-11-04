import { Routes, RouterModule } from "@angular/router";
import { WorkspaceModule } from './workspace';
import { WelcomeModule } from './welcome/welcome.module'
import { SuperCounterModule } from './super-counter/super-counter.module'

export function loadWorkspace() {
  return WorkspaceModule;
}

export function loadWelcome() {
  return WelcomeModule;
}

export function loadSuperCounter() {
  return SuperCounterModule;
}

const children: Routes = [
  {
    path: "workspace",
    loadChildren: loadWorkspace
  },
  {
    path: "super",
    loadChildren: loadSuperCounter
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "workspace"
  },
  {
    path: "welcome",
    loadChildren: loadWelcome,
  }
];

export const routing = RouterModule.forChild([{
  path: '',
  children: children
}]);
