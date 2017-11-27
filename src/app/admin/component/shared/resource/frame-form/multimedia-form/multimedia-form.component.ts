import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const VIDEO_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultimediaFormComponent),
  multi: true
}

interface IVideoForm {
  data: {
    srcs: string[];
  }
}

interface SliderForm {
  data: {
    srcs: string[];
    timing: number;
    animation: string;
  }
}

interface IFrameForm {
  data: {
    src: string;
  }
}

@Component({
  selector: 'app-multimedia-form',
  templateUrl: './multimedia-form.component.html',
  styleUrls: ['./multimedia-form.component.scss'],
  providers: [VIDEO_CONTROL_VALUE_ACCESSOR]
})
export class MultimediaFormComponent extends BaseFormComponent<IVideoForm | SliderForm | IFrameForm> {

  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): IVideoForm | SliderForm |IFrameForm {
    if (obj) {
      if (typeof (obj.data) === 'string') {
        if (obj.type === 'videos') {
          obj.data = {
            srcs: [obj.data]
          }
        }
        if (obj.type === 'slider') {
          obj.data = {
            srcs: [obj.data],
            timing: 3,
            animation: 'hinge'
          }
        }
      }
    }
    return super.clone(obj);
  }

}
