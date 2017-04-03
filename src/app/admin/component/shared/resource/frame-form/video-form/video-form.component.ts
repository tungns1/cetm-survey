import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const VIDEO_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VideoFormComponent),
  multi: true
}

interface IVideoForm {
  srcs: string[];
}

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss'],
  providers: [VIDEO_CONTROL_VALUE_ACCESSOR]
})
export class VideoFormComponent extends BaseFormComponent<IVideoForm> {

  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): IVideoForm {
    if (typeof (obj) === 'string') {
      return {
        srcs: [obj]
      }
    }
    return super.clone(obj);
  }

}
