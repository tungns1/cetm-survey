import { Routes, RouterModule } from "@angular/router"
import { ReportComponent } from "./component";

import { ReportHistoryModule } from './component/history';
import { ReportDashboardModule } from './component/dashboard';
import { ReportCustomerModule } from './component/customer';
import { ReportKioskModule } from './component/kiosk';
import { ReportCounterModule } from './component/counter';
import { SessionValidationGuard } from './shared';

export function loadReportHistoryModule() {
    return ReportHistoryModule;
}


export function loadReportDashboardModule() {
    return ReportDashboardModule;
}


export function loadReportCustomerModule() {
    return ReportCustomerModule;
}
export function loadReportKioskModule() {
    return ReportKioskModule;
}
export function loadReportCounterModule() {
    return ReportCounterModule;
}

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "history", loadChildren: loadReportHistoryModule },
    { path: "dashboard", loadChildren: loadReportDashboardModule },
    { path: "customer/:id", loadChildren: loadReportCustomerModule },
    { path: "customer", loadChildren: loadReportCustomerModule },
    { path: "kiosk", loadChildren: loadReportKioskModule },
    { path: "counter", loadChildren: loadReportCounterModule }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        children: children,
        component: ReportComponent,
        canActivate: [SessionValidationGuard]
    }
]);