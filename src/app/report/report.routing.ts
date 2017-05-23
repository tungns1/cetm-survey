import { Routes, RouterModule } from "@angular/router"
import { ReportComponent } from './report/report.component';

import { ReportHistoryModule } from './component/history';
import { ReportDashboardModule } from './component/dashboard';
import { ReportCustomerModule } from './component/customer';
import { ReportKioskModule } from './component/kiosk';
import { ReportCounterModule } from './component/counter';
import { ReportStoreModule } from './component/store';
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
export function loadReportStoreModule() {
    return ReportStoreModule;
}

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "history", loadChildren: loadReportHistoryModule },
    { path: "dashboard", loadChildren: loadReportDashboardModule },
    { path: "customer/:id", loadChildren: loadReportCustomerModule },
    { path: "customer", loadChildren: loadReportCustomerModule },
    { path: "kiosk", loadChildren: loadReportKioskModule },
    { path: "counter", loadChildren: loadReportCounterModule },
    { path: "store", loadChildren: loadReportStoreModule }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        children: children,
        component: ReportComponent,
        canActivate: [SessionValidationGuard]
    }
]);