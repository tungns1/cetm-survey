import { Routes, RouterModule } from "@angular/router";
import { SharedService } from "../shared/";

import { CounterComponent, WorkspaceModule, LegacyModule } from "./component/";
import { WorkspaceGuard } from './service';

const children: Routes = [
  {
    path: ":branch_code/:counter_code",
    loadChildren: () => LegacyModule
  },
  {
    path: "workspace",
    loadChildren: () => WorkspaceModule,
    canActivate: [
      WorkspaceGuard,
      SharedService.Auth.AuthGuard
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
