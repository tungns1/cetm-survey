import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalDayTimePipe} from './localDayTime';
import {TimeDurationPipe} from './timeDuration';
import {TimerComopnent} from './timer.component';

let exports = [LocalDayTimePipe, TimeDurationPipe, TimerComopnent]

@NgModule({
    imports: [CommonModule],
    declarations: [...exports],
    exports: [...exports]
})
export class TimeModule { }
