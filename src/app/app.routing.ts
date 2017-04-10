import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: "admin", loadChildren: "./admin/index" },
    { path: "monitor", loadChildren: "./monitor/index" },
    { path: "report", loadChildren: "./report/index" },
    { path: "counter", loadChildren: "./counter/index" },
    { path: "setting", loadChildren: "./setting/index" },
    { path: "auth", loadChildren: "./auth/index#AuthModule" },
    { path: "setup", loadChildren: "./setup/index" },
    { path: "", pathMatch: "full", redirectTo: "report" }
];

export const appRouting = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
    imports: [appRouting],
    exports: [RouterModule]
})
export class AppRoutingModule {

}