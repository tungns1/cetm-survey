import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule, ReportFilterModule } from '../shared';

import { CusWaitingService } from './shared/cus-waiting.service';

import { CusWaitingComponent } from './cus-waiting.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: CusWaitingComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing, SharedModule,
    ReportFilterModule, AgGridModule.withComponents([CusWaitingComponent]),
    NgxChartsModule
  ],
  declarations: [CusWaitingComponent],
  providers: [CusWaitingService]
})
export class CusWaitingModule { }
