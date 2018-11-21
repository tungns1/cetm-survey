import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { ScreenComponent } from './screen/screen.component';
import { FeedbackComponent } from './feedback/feedback.component';
// import { FeedbackSurveyComponent } from './feedback-survey/feedback-survey.component';
import { SFlowComponent } from './sflow/sflow.component';
import { CampaignComponent } from './campaign/campaign.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'screen'
  },
  {
    path: 'counter',
    pathMatch: 'full',
    redirectTo: 'counter/list'
  },
  {
    path: 'counter/:id',
    component: CounterComponent
  },
  {
    path: 'kiosk',
    pathMatch: 'full',
    redirectTo: 'kiosk/list'
  },
  {
    path: 'kiosk/:id',
    component: KioskComponent
  },
  {
    path: 'screen',
    pathMatch: 'full',
    redirectTo: 'screen/list'
  },
  {
    path: 'screen/:id',
    component: ScreenComponent
  },
  {
    path: 'feedback',
    pathMatch: 'full',
    redirectTo: 'feedback/list'
  },
  {
    path: 'feedback/:id',
    component: FeedbackComponent
  },
  // {
  //   path: 'feedbackSurvey',
  //   pathMatch: 'full',
  //   redirectTo: 'feedbackSurvey/list'
  // },
  // {
  //   path: 'feedbackSurvey/:id',
  //   component: FeedbackSurveyComponent
  // },
  {
    path: 'sflow',
    pathMatch: 'full',
    redirectTo: 'sflow/list'
  },
  {
    path: 'sflow/:id',
    component: SFlowComponent
  },
  {
    path: 'campaign',
    pathMatch: 'full',
    redirectTo: 'campaign/list'
  },
  {
    path: 'campaign/:id',
    component: CampaignComponent
  }
]

import { HouseComponent } from './house.component';

export const routing = RouterModule.forChild([
  {
    path: '',
    component: HouseComponent,
    children: children
  }
]);
