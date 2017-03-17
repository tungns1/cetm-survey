import { Routes, RouterModule } from "@angular/router"
import { AuthGuard } from "./shared/";
import { MonitorComponent, MonitorTicketModule } from "./component";

const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "ticket" },
    { path: "ticket", loadChildren: () => MonitorTicketModule }
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [AuthGuard],
        component: MonitorComponent,
        children: children
    }
]);