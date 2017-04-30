import { Routes, RouterModule } from "@angular/router"
import { SessionValidationGuard } from "./shared/";
import { SetupGlobalModule } from "./setup-global/setup-global.module";
import { SetupComponent } from "./setup.component";
import { ServiceModule } from "./service/service.module";
import { TicketModule } from "./ticket/ticket.module";
import { TransactionModule } from "./transaction/transaction.module";


export function loadSetupGlobalModule() {
    return SetupGlobalModule
}
export function loadServiceModule() {
    return ServiceModule
}
export function loadTicketModule() {
    return TicketModule
}
export function loadTransactionModule() {
    return TransactionModule
}

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "global" },
    { path: "global", loadChildren: loadSetupGlobalModule },
    { path: "service", loadChildren: loadServiceModule },
    { path: "ticket", loadChildren: loadTicketModule },
    { path: "transaction", loadChildren: loadTransactionModule },
];

export const routing = RouterModule.forChild([
    {
        path: "",
        canActivate: [SessionValidationGuard],
        component: SetupComponent,
        children: children
    }
]);