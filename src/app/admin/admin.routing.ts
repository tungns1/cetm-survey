import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/";
import {
  AdminComponent, OrgModule,
  CenterModule, HouseModule, MetaModule
} from "./component";

export const children: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "org"
  },
  {
    path: "org",
    loadChildren: "./org/org.module#OrgModule"
  },
  {
    path: "meta",
    loadChildren: "./meta/meta.module#MetaModule"
  },
  {
    path: "house",
    loadChildren: "./house/house.module#HouseModule"
  },
  {
    path: "center",
    loadChildren: "./center/center.module#CenterModule"
  }
]

export const routing = RouterModule.forChild([
  {
    path: "",
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: children
  }
]);
