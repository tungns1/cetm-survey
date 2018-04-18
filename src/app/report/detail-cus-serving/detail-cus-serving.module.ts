import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailCusServingComponent } from './detail-cus-serving.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: DetailCusServingComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing
  ],
  declarations: [DetailCusServingComponent]
})
export class DetailCusServingModule { }
