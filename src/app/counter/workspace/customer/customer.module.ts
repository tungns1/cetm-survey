import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from './customer-info.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [CustomerInfoComponent],
  exports: [CustomerInfoComponent]
})
export class CustomerModule { }
