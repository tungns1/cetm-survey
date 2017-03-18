import { Routes, RouterModule } from "@angular/router"
import { AuthGuard } from "./shared/";
import { ReportComponent} from "./component";

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "history", loadChildren: "./component/history/index#ReportHistoryModule" },
    { path: "dashboard", loadChildren: "./component/dashboard/index#ReportDashboardModule" },
    { path: "customer/:id", loadChildren: "./component/customer/index#ReportCustomerModule" },
    { path: "customer", loadChildren: "./component/customer/index#ReportCustomerModule" }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [AuthGuard],
        children: children,
        component: ReportComponent
    }
]);