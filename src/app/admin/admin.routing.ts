import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/";
import { AdminComponent } from "./component";

export const children: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "org"
  },
  {
    path: "org",
    loadChildren: "./component/org/org.module#OrgModule"
  },
  {
    path: "meta",
    loadChildren: "./component/meta/meta.module#MetaModule"
  },
  {
    path: "house",
    loadChildren: "./component/house/house.module#HouseModule"
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
