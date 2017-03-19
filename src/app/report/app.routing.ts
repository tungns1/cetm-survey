import { Routes, RouterModule } from "@angular/router"
import { AuthGuard } from "./shared/";
import { ReportComponent } from "./component";

import { ReportHistoryModule } from './component/history';
import { ReportDashboardModule } from './component/dashboard';
import { ReportCustomerModule } from './component/customer';

export function loadReportHistoryModule() {
    return ReportHistoryModule;
}


export function loadReportDashboardModule() {
    return ReportDashboardModule;
}


export function loadReportCustomerModule() {
    return ReportCustomerModule;
}

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "history", loadChildren: loadReportHistoryModule },
    { path: "dashboard", loadChildren: loadReportDashboardModule },
    { path: "customer/:id", loadChildren: loadReportCustomerModule },
    { path: "customer", loadChildren: loadReportCustomerModule }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [AuthGuard],
        children: children,
        component: ReportComponent
    }
]);