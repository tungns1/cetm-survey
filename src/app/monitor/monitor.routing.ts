import { Routes, RouterModule } from "@angular/router"
import { AuthGuard } from "./shared/";
import { MonitorComponent, MonitorTicketModule, MonitorDeviceModule } from "./component";


export function loadMonitorTicketModule() {
    return MonitorTicketModule
}

export function loadMonitorDeviceModule() {
    return MonitorDeviceModule
}
export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "ticket" },
    { path: "ticket", loadChildren: loadMonitorTicketModule },
    { path: "device", loadChildren: loadMonitorDeviceModule }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [AuthGuard],
        component: MonitorComponent,
        children: children
    }
]);