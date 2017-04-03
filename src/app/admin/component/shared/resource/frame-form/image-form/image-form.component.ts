import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const IMAGE_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageFormComponent),
  multi: true
}

interface ImageForm {
  srcs: string[];
}

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
  providers: [IMAGE_CONTROL_VALUE_ACCESSOR]
})
export class ImageFormComponent extends BaseFormComponent<ImageForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): ImageForm {
    if (typeof obj === 'string') {
      return {
        srcs: [obj]
      }
    }
    return super.clone(obj);
  }

}
