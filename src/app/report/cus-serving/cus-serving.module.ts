import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CusServingComponent } from './cus-serving.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: CusServingComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing
  ],
  declarations: [CusServingComponent]
})
export class CusServingModule { }
