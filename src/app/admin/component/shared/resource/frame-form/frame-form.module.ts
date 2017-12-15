import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { TextFormModule } from './text-form/text-form.module';
import { ImageFormModule } from './image-form/image-form.module';
import { VideoFormModule } from './video-form/video-form.module';
import { RepeaterFormModule } from './repeater-form/repeater-form.module';
import { SliderFormModule } from './slider-form/slider-form.module';
import { MultimediaFormModule } from './multimedia-form/multimedia-form.module';
import { I18nFormModule } from './i18n-form/i18n-form.module';
import { KeyboardFormModule } from './keyboard-form/keyboard-form.module';
import { ClockFormModule } from './clock-form/clock-form.module';
import { TemplateFormModule } from './template-form/template-form.module';
import {
  ModalModule, AdminFormModule, FlexLayoutModule,
  AccordionModule, provideUploadURLToken
} from '../shared';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    ModalModule,
    AdminFormModule,
    TextFormModule, ImageFormModule, VideoFormModule, 
    MultimediaFormModule, ClockFormModule, TemplateFormModule,
    FlexLayoutModule, RepeaterFormModule, AccordionModule,
    SliderFormModule, I18nFormModule, KeyboardFormModule
  ],
  declarations: [GenericFormComponent],
  providers: [provideUploadURLToken],
  entryComponents: [GenericFormComponent]
})
export class FrameFormModule { }
