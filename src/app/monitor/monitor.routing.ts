import { Routes, RouterModule } from "@angular/router"
import { MonitorComponent, MonitorTicketModule, MonitorDeviceModule } from "./component";
import { SessionValidationGuard } from '../auth';

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
        component: MonitorComponent,
        canActivate: [SessionValidationGuard],
        children: children
    }
]);