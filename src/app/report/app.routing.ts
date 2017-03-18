import { Routes, RouterModule } from "@angular/router"
import { AuthGuard } from "./shared/";
import { ReportComponent, ReportHistoryModule, ReportDashboardModule, ReportCustomerModule } from "./component";

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "history", loadChildren: "./component/index#ReportHistoryModule" },
    { path: "dashboard", loadChildren: "./component/index#ReportDashboardModule" },
    { path: "customer/:id", loadChildren: "./component/index#ReportCustomerModule" },
    { path: "customer", loadChildren: "./component/index#ReportCustomerModule" },
    { path: "sosanh", loadChildren: "admin/report/compare/compare.module" },
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [AuthGuard],
        children: children,
        component: ReportComponent
    }
]);