import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { TFormComponent } from './tform/tform.component';
import { LayoutComponent } from './layout/layout.component';
import { CenterComponent } from './center.component';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { VoiceComponent } from './voice/voice.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveySettingComponent } from './survey-setting/survey-setting.component';
import { LinkChannelComponent } from './link-channel/link-channel.component';
import { FormConfigComponent } from './form-config/form-config.component';
import { FormUserComponent } from './form-user/form-user.component';
import { ServiceGroupComponent } from './service-group/service-group.component';

const children: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'service'
  },
  {
    path: 'service',
    pathMatch: 'full',
    redirectTo: 'service/list'
  },
  {
    path: 'service/:id',
    component: ServiceComponent
  },
  {
    path: 'tform',
    pathMatch: 'full',
    redirectTo: 'tform/list'
  },
  {
    path: 'tform/:id',
    component: TFormComponent
  },
  {
    path: 'layout',
    pathMatch: 'full',
    redirectTo: 'layout/list'
  },
  {
    path: 'layout/:id',
    component: LayoutComponent
  },
  {
    path: 'ticketlayout',
    pathMatch: 'full',
    redirectTo: 'ticketlayout/list'
  },
  {
    path: 'ticketlayout/:id',
    component: TicketLayoutComponent
  },
  {
    path: 'voice',
    pathMatch: 'full',
    redirectTo: 'voice/list'
  },
  {
    path: 'voice/:id',
    component: VoiceComponent
  },
  {
    path: 'survey',
    pathMatch: 'full',
    redirectTo: 'survey/list'
  },
  {
    path: 'survey/:id',
    component: SurveyComponent
  },
  {
    path: 'surveySetting',
    pathMatch: 'full',
    redirectTo: 'surveySetting/list'
  },
  {
    path: 'surveySetting/:id',
    component: SurveySettingComponent
  },
  {
    path: 'linkChannel/:id',
    component: LinkChannelComponent
  },
  {
    path: 'formconfig',
    pathMatch: 'full',
    redirectTo: 'formconfig/list'
  },
  {
    path: 'formconfig/:id',
    component: FormConfigComponent
  },
  {
    path: 'formuser',
    pathMatch: 'full',
    redirectTo: 'formuser/list'
  },
  {
    path: 'formuser/:id',
    component: FormUserComponent
  },
  {
    path: 'sgroup',
    pathMatch: 'full',
    redirectTo: 'sgroup/list'
  },
  {
    path: 'sgroup/:id',
    component: ServiceGroupComponent
  }
]

export const routing = RouterModule.forChild([
  {
    path: '',
    component: CenterComponent,
    children: children
  }
]);
