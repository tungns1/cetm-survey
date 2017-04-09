import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./component";
import { OrgModule } from './component/org';
import { CenterModule } from './component/center';
import { HouseModule } from './component/house';
import { MetaModule } from './component/meta';

export function loadMetaModule() {
  return MetaModule;
}

export function loadCenterModule() {
  return CenterModule;
}

export function loadHouseModule() {
  return HouseModule;
}

export function loadOrgModule() {
  return OrgModule;
}

export const children: Routes = [
  { path: "", pathMatch: "full", redirectTo: "org" },
  { path: "org", loadChildren: loadOrgModule },
  { path: "meta", loadChildren: loadMetaModule },
  { path: "house", loadChildren: loadHouseModule },
  { path: "center", loadChildren: loadCenterModule }
]

export const routing = RouterModule.forChild([
  {
    path: "",
    component: AdminComponent,
    children: children
  }
]);
