import { Routes, RouterModule } from "@angular/router";
import { WorkspaceModule } from './workspace';
import { CounterComponent } from './counter/counter.component';
import { SettingComponent } from './setting/setting.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SupperCounterComponent } from './supper-counter/supper-counter.component'
import { CounterSessionValidationGuard } from './shared';

export function loadWorkspace() {
  return WorkspaceModule;
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
    path: "",
    pathMatch: "full",
    redirectTo: "welcome"
  },
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "supperCounter",
    component: SupperCounterComponent
  }
];

export const routing = RouterModule.forChild([{
  path: '',
  component: CounterComponent,
  children: children
}]);
