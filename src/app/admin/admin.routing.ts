import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/";
import {
  AdminComponent, OrgModule,
  CenterModule, HouseModule, MetaModule
} from "./component";

const children: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "org"
  },
  {
    path: "org",
    loadChildren: () => OrgModule
  },
  {
    path: "meta",
    loadChildren: () => MetaModule
  },
  {
    path: "house",
    loadChildren: () => HouseModule
  },
  {
    path: "center",
    loadChildren: () => CenterModule
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

export const components = children.map(c => c.component).filter(c => !!c);

components.push(AdminComponent);

