import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFormModule, FlexLayoutModule, MultiFilePickerModule } from '../../shared';
import { MultimediaFormComponent } from './multimedia-form.component';
import { IFrameFormModule } from '../i-frame-form/i-frame-form.module';

@NgModule({
    imports: [
        FormsModule, CommonModule, AdminFormModule,
        MultiFilePickerModule, FlexLayoutModule, IFrameFormModule
    ],
    declarations: [MultimediaFormComponent],
    exports: [MultimediaFormComponent]
})
export class MultimediaFormModule {

}