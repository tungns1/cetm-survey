import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailCusWaitingComponent } from './detail-cus-waiting.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: DetailCusWaitingComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing
  ],
  declarations: [DetailCusWaitingComponent]
})
export class DetailCusWaitingModule { }
