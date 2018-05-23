import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail.component';
import { RouterModule } from '@angular/router';
const routing = [
    {
        path: '',
        component: BookingDetailComponent
    }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing)
  ],
  declarations: [BookingDetailComponent]
})
export class BookingDetailModule { }
