import { Routes, RouterModule } from "@angular/router";
import { WorkspaceModule } from './workspace';
import { CounterComponent } from './counter/counter.component';
// import { SettingComponent } from './setting/setting.component';
// import { SuperCounterSettingComponent } from './super-counter-setting/super-counter-setting.component';
// import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeModule } from './welcome/welcome.module'
import { SuperCounterModule } from './super-counter/super-counter.module'
import { CounterSessionValidationGuard } from './shared';

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
    loadChildren: loadWorkspace,
    // canActivate: [
    //   CounterSessionValidationGuard
    // ]
  },
  {
    path: "super",
    loadChildren: loadSuperCounter,
    // canActivate: [
    //   CounterSessionValidationGuard
    // ]
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
  component: CounterComponent,
  children: children
}]);
