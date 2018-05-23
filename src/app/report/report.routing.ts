import { Routes, RouterModule } from "@angular/router"
import { ReportComponent } from './report/report.component';

import { ReportHistoryModule } from './history';
import { ReportDashboardModule } from './dashboard';
import { ReportCustomerModule } from './customer';
import { ReportKioskModule } from './kiosk';
import { ReportCounterModule } from './counter';
import { ReportStoreModule } from './store';
import { StaffPerformanceModule } from './staff-performance/staff-performance.module';
import { CusWaitingModule } from './cus-waiting/cus-waiting.module';
import { DetailCusWaitingModule } from './detail-cus-waiting/detail-cus-waiting.module';
import { CusServingModule } from './cus-serving/cus-serving.module';
import { DetailCusServingModule } from './detail-cus-serving/detail-cus-serving.module';
import { SessionValidationGuard } from './shared';
import { AppointmentPerformanceModule } from "./appointment-performance/appointment-performance.module";
import { BookingHistoryModule } from "./booking-history/booking-history.module";
import { BookingStatusModule } from "./booking-status/booking-status.module";
import { BookingDetailModule } from "./booking-detail/booking-detail.module";

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
export function loadReportStaffPerformanceModule() {
    return StaffPerformanceModule;
}
export function loadReportCusWaitingModule() {
    return CusWaitingModule;
}
export function loadReportDetailCusWaitingModule() {
    return DetailCusWaitingModule;
}
export function loadReportCusServingModule() {
    return CusServingModule;
}
export function loadReportDetailCusServingModule() {
    return DetailCusServingModule;
}

export function loadReportAppointmentPerformanceModule(){
    return AppointmentPerformanceModule;
}

export function loadReportBookingHistoryModule(){
    return BookingHistoryModule;
}

export function loadReportBookingStatusModule(){
    return BookingStatusModule;
}

export function loadReportBookingDetailModule(){
    return BookingDetailModule;
}

export const children: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "history", loadChildren: loadReportHistoryModule },
    { path: "dashboard", loadChildren: loadReportDashboardModule },
    { path: "customer/:id", loadChildren: loadReportCustomerModule },
    { path: "customer", loadChildren: loadReportCustomerModule },
    { path: "kiosk", loadChildren: loadReportKioskModule },
    { path: "counter", loadChildren: loadReportCounterModule },
    { path: "store", loadChildren: loadReportStoreModule },
    { path: "staffPerformance", loadChildren: loadReportStaffPerformanceModule },
    { path: "cusWaiting", loadChildren: loadReportCusWaitingModule },
    { path: "detailCusWaiting", loadChildren: loadReportDetailCusWaitingModule },
    { path: "cusServing", loadChildren: loadReportCusServingModule },
    { path: "detailSusServing", loadChildren: loadReportDetailCusServingModule },
    { path: 'appointmentPerformance', loadChildren: loadReportAppointmentPerformanceModule},
    { path: 'bookingHistory', loadChildren: loadReportBookingHistoryModule},
    { path: 'bookingStatus', loadChildren: loadReportBookingStatusModule},
    { path: 'bookingDetail', loadChildren: loadReportBookingDetailModule},
    // { path: 'appointmentPerformance/bookingStatus', loadChildren: loadReportAppointmentPerformanceModule},
    // { path: 'appointmentPerformance/bookingDetail', loadChildren: loadReportAppointmentPerformanceModule}
];

export const routing = RouterModule.forChild([
    {
        path: "",
        children: children,
        component: ReportComponent,
        canActivate: [SessionValidationGuard]
    }
]);