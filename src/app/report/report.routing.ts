import { Routes, RouterModule } from "@angular/router"
import { ReportComponent } from './report/report.component';

import { ReportHistoryModule } from './history';
import { ReportDashboardModule } from './dashboard';
import { ReportCustomerModule } from './customer';
import { ReportKioskModule } from './kiosk';
import { ReportCounterModule } from './counter';
import { ReportStoreModule } from './store';

import { SurveyDashboardModule } from './survey-dashboard/survey-dashboard.module';
import { SurveyHistoryModule } from './survey-history/survey-history.module';
import { SurveyAnalysisModule } from './survey-analysis/survey-analysis.module';

import { StaffPerformanceModule } from './staff-performance/staff-performance.module';
import { CusWaitingModule } from './cus-waiting/cus-waiting.module';
import { DetailCusWaitingModule } from './detail-cus-waiting/detail-cus-waiting.module';
import { CusServingModule } from './cus-serving/cus-serving.module';
import { DetailCusServingModule } from './detail-cus-serving/detail-cus-serving.module';

import { SessionValidationGuard } from './shared';
import { TimelineModule } from "./timeline/timeline.module";
import { LuckyUserModule } from "./lucky-user/lucky-user.module";

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

export function loadSurveyDashboadModule() {
    return SurveyDashboardModule;
}
export function loadSurveyHistoryModule() {
    return SurveyHistoryModule;
}
export function loadSurveyAnalysisModule() {
    return SurveyAnalysisModule;
}
export function loadTimelineModule() {
    return TimelineModule;
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

export function loadLuckyUsersModule(){
    return LuckyUserModule;
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

    { path: "surveyDashboard", loadChildren: loadSurveyDashboadModule },
    { path: "surveyHistory", loadChildren: loadSurveyHistoryModule },
    { path: "surveyAnalysis", loadChildren: loadSurveyAnalysisModule },
    { path: "timeline", loadChildren: loadTimelineModule },
    { path: "luckyUsers", loadChildren: loadLuckyUsersModule }
    
];

export const routing = RouterModule.forChild([
    {
        path: "",
        children: children,
        component: ReportComponent,
        canActivate: [SessionValidationGuard]
    }
]);