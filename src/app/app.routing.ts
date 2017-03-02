import { RouterModule, Routes } from "@angular/router";
import { AdminModule } from "./admin";

export const routes: Routes = [
    { path: "admin", loadChildren: "./admin/index#AdminModule" },
    { path: "monitor", loadChildren: "./monitor/index" },
    { path: "report", loadChildren: "./report/index" },
    { path: "counter", loadChildren: "./counter/index" },
    { path: "**", redirectTo: "report" }
];

export const appRouting = RouterModule.forRoot(routes, {useHash: true});