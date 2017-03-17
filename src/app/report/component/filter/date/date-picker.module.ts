
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DatePickerComponent],
    exports: [DatePickerComponent],
})
export class DatePickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DatePickerModule,
            providers: []
        };
    }
}
