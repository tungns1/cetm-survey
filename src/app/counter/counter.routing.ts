import { Routes, RouterModule } from "@angular/router";
import { WorkspaceModule } from './workspace';
import { CounterComponent } from './counter/counter.component';
import { SettingComponent } from './setting/setting.component';
import { SuperCounterSettingComponent } from './super-counter-setting/super-counter-setting.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SuperCounterModule } from './super-counter/super-counter.module'
import { CounterSessionValidationGuard } from './shared';

export function loadWorkspace() {
  return WorkspaceModule;
}

export function loadSuperCounter() {
  return SuperCounterModule;
}

const children: Routes = [
  {
    path: "workspace",
    loadChildren: loadWorkspace, 
    canActivate: [
      CounterSessionValidationGuard
    ]
  },
  {
    path: "setting",
    component: SettingComponent
  },
  {
    path: "superCounterSetting",
    component: SuperCounterSettingComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/counter/welcome?setting=/setting&redirect=/workspace"
  },
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: 'super',
    pathMatch: "full",
    redirectTo: "/counter/welcome?setting=/superCounterSetting&redirect=/superCounter"
  },
  {
    path: "superCounter",
    loadChildren: loadSuperCounter, 
    canActivate: [
      CounterSessionValidationGuard
    ]
  }
];

export const routing = RouterModule.forChild([{
  path: '',
  component: CounterComponent,
  children: children
}]);
