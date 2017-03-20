import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDayTimePipe } from './localDayTime';
import { TimeDurationPipe } from './timeDuration';
import { TimerComopnent } from './timer.component';

let exportDefault = [LocalDayTimePipe, TimeDurationPipe, TimerComopnent]

@NgModule({
    imports: [CommonModule],
    declarations: [...exportDefault],
    exports: [...exportDefault]
})
export class TimeModule { }

export { TimerComopnent } from './timer.component';
