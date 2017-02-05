import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalDayTimePipe} from './localDayTime';
import {TimeDurationPipe} from './timeDuration';

let exports = [LocalDayTimePipe, TimeDurationPipe]

@NgModule({
    imports: [CommonModule],
    declarations: [...exports],
    exports: [...exports]
})
export class TimeModule { }
