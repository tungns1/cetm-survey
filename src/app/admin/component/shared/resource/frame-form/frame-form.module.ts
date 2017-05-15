import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { TextFormModule } from './text-form/text-form.module';
import { ImageFormModule } from './image-form/image-form.module';
import { VideoFormModule } from './video-form/video-form.module';
import { ModalModule, AdminFormModule, FlexLayoutModule } from '../shared';
import { provideUploadURLToken } from './shared';
import { RepeaterFormModule } from './repeater-form/repeater-form.module';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    ModalModule,
    AdminFormModule,
    TextFormModule, ImageFormModule, VideoFormModule,
    FlexLayoutModule, RepeaterFormModule
  ],
  declarations: [GenericFormComponent],
  providers: [provideUploadURLToken],
  exports: [GenericFormComponent],
  entryComponents: [GenericFormComponent]
})
export class FrameFormModule { }
