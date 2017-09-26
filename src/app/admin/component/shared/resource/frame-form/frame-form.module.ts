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
import { ModalModule, AdminFormModule, FlexLayoutModule, AccordionModule } from '../shared';
import { provideUploadURLToken } from './shared';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    ModalModule,
    AdminFormModule,
    TextFormModule, ImageFormModule, VideoFormModule, MultimediaFormModule,
    FlexLayoutModule, RepeaterFormModule, AccordionModule,
    SliderFormModule
  ],
  declarations: [GenericFormComponent],
  providers: [provideUploadURLToken],
  entryComponents: [GenericFormComponent]
})
export class FrameFormModule { }
