import { RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { SummaryComponent } from './summary/summary.component';
import { DetailComponent } from './detail/detail.component';
import { MonitorSurveyGuard } from './survey.guard';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: SurveyComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'summary' },
            { path: 'summary', component: SummaryComponent },
            { path: 'detail/:store', component: DetailComponent }
        ],
        canActivate: [MonitorSurveyGuard]
    }
]);