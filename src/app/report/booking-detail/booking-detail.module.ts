import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BookingDetailComponent } from './booking-detail.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule, MatDatepickerModule, MatNativeDateModule,  } from '@angular/material';
import { ReportFilterModule, SharedModule,  } from '../shared';
import { DatePickerModule } from '../shared/filter/date';
import { BookingService } from '../shared/service/booking-service.service';
import { DetailProgessComponent } from './detail-progess/detail-progess.component';
import { TimeDurationPipe } from '../../x/ng/time/timeDuration';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'

const routing = [
    {
        path: '',
        component: BookingDetailComponent
    }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    MatTabsModule,
    ReportFilterModule,
    SharedModule,
    SelectDropDownModule,
    DatePickerModule,
    MatDatepickerModule, MatNativeDateModule,
  ],
  declarations: [BookingDetailComponent, DetailProgessComponent, DetailModalComponent, ],
  entryComponents: [DetailModalComponent,],
  providers: [BookingService, TimeDurationPipe, DatePipe]
})
export class BookingDetailModule { }
