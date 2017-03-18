import { Routes, RouterModule } from "@angular/router"
import { AuthGuard } from "./shared/";
import { MonitorComponent, MonitorTicketModule } from "./component";

export function loadMonitorTicketModule() {
    return MonitorTicketModule
}

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "ticket" },
    { path: "ticket", loadChildren: loadMonitorTicketModule }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [AuthGuard],
        component: MonitorComponent,
        children: children
    }
]);