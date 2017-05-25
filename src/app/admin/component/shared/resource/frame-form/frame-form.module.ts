import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { TextFormModule } from './text-form/text-form.module';
import { ImageFormModule } from './image-form/image-form.module';
import { VideoFormModule } from './video-form/video-form.module';
import { ModalModule, AdminFormModule, FlexLayoutModule, AccordionModule } from '../shared';
import { provideUploadURLToken } from './shared';
import { RepeaterFormModule } from './repeater-form/repeater-form.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule,
    ModalModule,
    AdminFormModule,
    TextFormModule, ImageFormModule, VideoFormModule,
    FlexLayoutModule, RepeaterFormModule, AccordionModule
  ],
  declarations: [GenericFormComponent],
  providers: [provideUploadURLToken],
  entryComponents: [GenericFormComponent]
})
export class FrameFormModule { }
